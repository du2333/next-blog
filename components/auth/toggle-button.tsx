"use client";

import { toggleRole } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function ToggleButton() {
  return (
    <Button onClick={toggleRole} className="cursor-pointer">
      Toggle
    </Button>
  );
}
