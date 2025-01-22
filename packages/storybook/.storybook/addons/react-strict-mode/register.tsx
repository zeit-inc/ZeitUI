import type { API } from "@storybook/manager-api";
import { addons, types } from "@storybook/manager-api";
import React, { useEffect, useState } from "react";

const ADDON_ID = "StrictModeSwitcher";

function StrictModeSwitcher({ api }: { api: API }) {
  const [isStrict, setStrict] = useState(() => api.getQueryParam("strict") === "true");

  const onChange = () => setStrict((val) => !val);

  useEffect(() => {
    const channel = api.getChannel();
    channel?.emit("strict/updated", isStrict);
    api.setQueryParams({
      strict: String(isStrict),
    });
  }, [isStrict]);

  return (
    <div>
      <label>
        Strict Mode:
        <input type="checkbox" checked={isStrict} onChange={onChange} />
      </label>
    </div>
  );
}

if (process.env.NODE_ENV !== "production") {
  addons.register(ADDON_ID, (api) => {
    addons.add(ADDON_ID, {
      match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
      render: () => <StrictModeSwitcher api={api} />,
      title: "Strict Mode Switcher",
      type: types.TOOL,
    });
  });
}
