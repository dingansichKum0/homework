import { useEffect, useRef, RefObject } from "react";

export const useMap = (
  container: RefObject<HTMLElement>,
  option: google.maps.MapOptions
) => {
  const mapRef = useRef<google.maps.Map>();
  const loadScrit = () =>
    new Promise((res, rej) => {
      const el = document.createElement("script");
      el.type = "text/javascript";
      el.async = true;
      el.src = "https://maps.googleapis.com/maps/api/js";
      el.onload = () => res();

      document.head.appendChild(el);
    });

  useEffect(() => {
    if (container.current) {
      const load = async () => {
        await loadScrit();
        mapRef.current = new google.maps.Map(container.current, option);
      };
      load();
    }
  }, [container.current]);

  return mapRef;
};
