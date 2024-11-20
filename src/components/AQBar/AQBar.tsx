'use client'
import Image from "next/image";
import React, { useEffect } from "react";

const TomorrowWidget: React.FC = () => {
  useEffect(() => {
    const initializeWidget = () => {
      const widgetId = "tomorrow-sdk";
      if (document.getElementById(widgetId)) {
        if ((window as any).__TOMORROW__) {
          (window as any).__TOMORROW__.renderWidget();
        }
        return;
      }

      const script = document.createElement("script");
      script.id = widgetId;
      script.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
      script.async = true;

      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
      }
    };

    initializeWidget();
  }, []);

  return (
    <div
      className="tomorrow"
      data-location-id="008052"
      data-language="EN"
      data-unit-system="METRIC"
      data-skin="light"
      data-widget-type="aqiPollutant"
      style={{ paddingBottom: "22px", position: "relative" }}
    >
      <a
        href="https://www.tomorrow.io/weather-api/"
        rel="nofollow noopener noreferrer"
        target="_blank"
        style={{
          position: "absolute",
          bottom: 0,
          transform: "translateX(-50%)",
          left: "50%",
        }}
      >
        <Image
          alt="Powered by the Tomorrow.io Weather API"
          src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
          width="250"
          height="18"
        />
      </a>
    </div>
  );
};

export default TomorrowWidget;
