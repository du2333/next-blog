"use client";

import { toggleRole } from "@/lib/actions";

export default function ToggleButton() {
  return (
    <button className="btn btn-primary" onClick={toggleRole}>
      Toggle
    </button>
  );
}
