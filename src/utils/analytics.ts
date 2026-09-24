/**
 * Lightweight, non-blocking visitor analytics system for React + TypeScript portfolio.
 * Records session data to a Google Sheets Apps Script endpoint.
 */

export interface AnalyticsPayload {
  visitorId: string;
  visitNumber: number;
  visitorType: "new" | "returning";
  sessionId: string;
  event: "page_view" | "resume_click" | "contact_click" | string;
  page: string;
  previousPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
  language: string;
  device: "mobile" | "tablet" | "desktop";
  browser: string;
  os: string;
  screenSize: string;
  viewport: string;
  resumeClicked: boolean;
  timeOnPage: number;
}

const FALLBACK_URL = "https://script.google.com/macros/s/AKfycbz2gBlwr9dPwC9wALhisYPspJ6iCxfK5_lFZ473pQ4SyFOAWfNbemCfC_4mSiUuKak6/exec";
const VITE_URL = (import.meta as any).env?.VITE_ANALYTICS_URL;

const GOOGLE_APPS_SCRIPT_URL = (VITE_URL && VITE_URL.includes("AKfycbz2gBlwr9dPwC9wALhisYPspJ6iCxfK5_lFZ473pQ4SyFOAWfNbemCfC_4mSiUuKak6"))
  ? VITE_URL
  : FALLBACK_URL;

// Key constants for storage
const VISITOR_ID_KEY = "yash_portfolio_visitor_id_v2";
const VISIT_NUMBER_KEY = "yash_portfolio_visit_number_v2";
const SESSION_ID_KEY = "yash_portfolio_session_id_v2";
const IS_RETURNING_KEY = "yash_portfolio_is_returning_v2";
const PAGE_VIEW_SENT_KEY = "portfolio_page_view_sent_v2";
const LAST_PAGE_KEY = "yash_portfolio_last_page_v2";

const pageLoadTime = Date.now();

// Generate a lightweight unique identifier
const generateId = (prefix: string): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomStr = "";
  for (let i = 0; i < 8; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}_${Date.now()}_${randomStr}`;
};

// Simple User-Agent parsers
const getBrowser = (ua: string): string => {
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/")) return "Safari";
  if (ua.includes("MSIE ") || ua.includes("Trident/")) return "Internet Explorer";
  return "Unknown Browser";
};

const getOS = (ua: string): string => {
  if (ua.includes("Windows NT")) return "Windows";
  if (ua.includes("Macintosh") || ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown OS";
};

const getDeviceType = (ua: string): "mobile" | "tablet" | "desktop" => {
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const width = window.innerWidth;
  if (isMobileUA) {
    return width < 768 ? "mobile" : "tablet";
  }
  if (width < 768) return "mobile";
  if (width >= 768 && width < 1024) return "tablet";
  return "desktop";
};

// Extract UTM parameters
const getUtmParams = () => {
  if (typeof window === "undefined") {
    return { source: "", medium: "", campaign: "" };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") || "",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
  };
};

class PortfolioAnalytics {
  private visitorId = "";
  private visitNumber = 1;
  private visitorType: "new" | "returning" = "new";
  private sessionId = "";
  private geoPromise: Promise<{ ip: string; country: string; city: string; region: string }>;

  constructor() {
    if (typeof window === "undefined") {
      this.geoPromise = Promise.resolve({ ip: "", country: "", city: "", region: "" });
      return;
    }

    console.log("[Analytics] tracker mounted");
    console.log("[Analytics] endpoint configured", GOOGLE_APPS_SCRIPT_URL);

    // Initialize visitor ID
    let storedVisitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!storedVisitorId) {
      storedVisitorId = generateId("usr");
      localStorage.setItem(VISITOR_ID_KEY, storedVisitorId);
      this.visitorType = "new";
      this.visitNumber = 1;
      localStorage.setItem(VISIT_NUMBER_KEY, "1");
    } else {
      this.visitorType = "returning";
      const storedVisits = localStorage.getItem(VISIT_NUMBER_KEY);
      this.visitNumber = storedVisits ? parseInt(storedVisits, 10) : 1;
    }
    this.visitorId = storedVisitorId;

    // Set returning flag
    localStorage.setItem(IS_RETURNING_KEY, "true");

    // Initialize session ID
    let storedSessionId = sessionStorage.getItem(SESSION_ID_KEY);
    if (!storedSessionId) {
      storedSessionId = generateId("sess");
      sessionStorage.setItem(SESSION_ID_KEY, storedSessionId);
      
      // If returning, increment visit number for this new session
      if (this.visitorType === "returning") {
        this.visitNumber += 1;
        localStorage.setItem(VISIT_NUMBER_KEY, this.visitNumber.toString());
      }
    }
    this.sessionId = storedSessionId;

    // Start fetching Geolocation asynchronously (non-blocking)
    this.geoPromise = this.fetchGeoData();

    // Auto-intercept clicks on DOM load or dynamically via delegation
    window.addEventListener("click", this.handleGlobalClick.bind(this));
  }

  private fetchGeoData(): Promise<{ ip: string; country: string; city: string; region: string }> {
    return new Promise(async (resolve) => {
      try {
        const res = await fetch("https://ipapi.co/json/", { cache: "force-cache" });
        if (res.ok) {
          const data = await res.json();
          resolve({
            ip: data.ip || "Unknown",
            country: data.country_name || "Unknown",
            city: data.city || "Unknown",
            region: data.region || "Unknown",
          });
          return;
        }
      } catch (e) {
        // ignore
      }

      try {
        const fbRes = await fetch("https://ip-api.com/json/");
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          resolve({
            ip: fbData.query || "Unknown",
            country: fbData.country || "Unknown",
            city: fbData.city || "Unknown",
            region: fbData.regionName || "Unknown",
          });
          return;
        }
      } catch (e) {
        // ignore
      }

      resolve({
        ip: "Unknown",
        country: "Unknown",
        city: "Unknown",
        region: "Unknown",
      });
    });
  }

  private async getGeoWithTimeout(ms: number = 1000): Promise<{ ip: string; country: string; city: string; region: string }> {
    let timeoutId: any;
    const timeoutPromise = new Promise<{ ip: string; country: string; city: string; region: string }>((resolve) => {
      timeoutId = setTimeout(() => {
        resolve({
          ip: "Unknown",
          country: "Unknown",
          city: "Unknown",
          region: "Unknown",
        });
      }, ms);
    });

    const geo = await Promise.race([this.geoPromise, timeoutPromise]);
    if (timeoutId) clearTimeout(timeoutId);
    return geo;
  }

  // Initial visit trigger
  public async trackInitialVisit() {
    try {
      if (typeof window === "undefined") return;

      // Wait at most 1 second for Geolocation
      const geo = await this.getGeoWithTimeout(1000);

      // Compile payload
      const payload = this.compilePayload("page_view", geo, false, 0);

      console.log("[Analytics] payload ready", payload);

      const pageViewSent = sessionStorage.getItem(PAGE_VIEW_SENT_KEY);
      if (pageViewSent === "true") {
        console.log("[Analytics] sessionStorage prevented sending duplicate page_view, but debug payload was logged above.");
        return;
      }

      sessionStorage.setItem(PAGE_VIEW_SENT_KEY, "true");

      // Send event asynchronously
      this.sendPayload(payload);
    } catch (e) {
      // Silently ignore all errors
    }
  }

  // Click trackers
  public async trackResumeDownload() {
    try {
      const geo = await this.getGeoWithTimeout(500);
      const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
      const payload = this.compilePayload("resume_click", geo, true, timeOnPage);
      console.log("[Analytics] payload ready", payload);
      this.sendPayload(payload);
    } catch (e) {
      // silent catch
    }
  }

  public async trackContactClick() {
    try {
      const geo = await this.getGeoWithTimeout(500);
      const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
      const payload = this.compilePayload("contact_click", geo, false, timeOnPage);
      console.log("[Analytics] payload ready", payload);
      this.sendPayload(payload);
    } catch (e) {
      // silent catch
    }
  }

  public async trackScrollProgress(percentage: number) {
    try {
      const geo = await this.getGeoWithTimeout(500);
      const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
      const payload = this.compilePayload(`scroll_progress_${percentage}`, geo, false, timeOnPage);
      console.log(`[Analytics] scroll progress payload ready (${percentage}%)`, payload);
      this.sendPayload(payload);
    } catch (e) {
      // silent catch
    }
  }

  public async trackSidekickEvent(eventName: string) {
    try {
      const geo = await this.getGeoWithTimeout(500);
      const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
      const payload = this.compilePayload(eventName, geo, false, timeOnPage);
      console.log(`[Analytics] sidekick event payload ready (${eventName})`, payload);
      this.sendPayload(payload);
    } catch (e) {
      // silent catch
    }
  }

  private compilePayload(
    event: "page_view" | "resume_click" | "contact_click" | string,
    geo: { ip: string; country: string; city: string; region: string },
    resumeClicked: boolean,
    timeOnPage: number
  ): AnalyticsPayload {
    const ua = navigator.userAgent;
    const ref = document.referrer;
    const utm = getUtmParams();
    const previousPage = sessionStorage.getItem(LAST_PAGE_KEY) || ref || "Direct";

    // Update last page
    sessionStorage.setItem(LAST_PAGE_KEY, window.location.href);

    return {
      visitorId: this.visitorId,
      visitNumber: this.visitNumber,
      visitorType: this.visitorType,
      sessionId: this.sessionId,
      event,
      page: window.location.href,
      previousPage,
      referrer: ref || "Direct",
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
      language: navigator.language || "Unknown",
      device: getDeviceType(ua),
      browser: getBrowser(ua),
      os: getOS(ua),
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      resumeClicked,
      timeOnPage,
    };
  }

  private sendPayload(payload: AnalyticsPayload) {
    try {
      console.log("[Analytics] request queued", GOOGLE_APPS_SCRIPT_URL);

      fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      })
      .then(() => {
        // success
      })
      .catch(() => {
        // silently ignore
      });
    } catch (err) {
      // silently ignore
    }
  }

  // Keep legacy method just in case
  public sendBeaconData() {
    this.trackInitialVisit();
  }

  private handleGlobalClick(e: MouseEvent) {
    try {
      const target = e.target as HTMLElement;
      if (!target) return;

      let element: HTMLElement | null = target;
      while (element && element !== document.body) {
        const text = (element.textContent || "").toLowerCase();
        const href = (element.getAttribute("href") || "").toLowerCase();
        const id = (element.getAttribute("id") || "").toLowerCase();

        const isResumeText = text.includes("resume") || text.includes("cv") || text.includes("curriculum vitae");
        const isResumeHref = href.includes("resume") || href.includes("cv") || href.includes(".pdf");
        const isResumeId = id.includes("resume") || id.includes("cv");

        if (isResumeText || isResumeHref || isResumeId) {
          this.trackResumeDownload();
          return;
        }

        const isContactText = text.includes("contact") || text.includes("let's talk") || text.includes("get in touch") || text.includes("lets talk") || text.includes("connect") || text.includes("inquiry");
        const isContactHref = href.includes("contact") || href.includes("mailto:") || href.includes("#contact");
        const isContactId = id.includes("contact") || id.includes("submit") || id.includes("inquiry");

        if (isContactText || isContactHref || isContactId) {
          this.trackContactClick();
          return;
        }

        element = element.parentElement;
      }
    } catch (err) {
      // silent catch
    }
  }
}

export const analytics = typeof window !== "undefined" ? new PortfolioAnalytics() : null;
