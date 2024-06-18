"use client";

import { Switch } from "@/components/ui/switch";

export function ForecastToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="w-full space-y-6">
      <div>
        <div className="space-y-4">
          <div className="space-y-0.5"></div>
          <Switch
            checked={checked}
            onCheckedChange={() => onChange(!checked)}
          />
        </div>
      </div>
    </div>
  );
}
