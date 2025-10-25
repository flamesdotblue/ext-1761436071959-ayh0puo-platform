import React from 'react';
import { Keyboard, Info } from 'lucide-react';

export default function ControlsPanel() {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Keyboard className="w-5 h-5" />
        <h4 className="text-lg font-semibold">Steuerung</h4>
      </div>
      <ul className="space-y-1 text-sm text-neutral-200">
        <li><span className="font-medium">Pfeiltasten</span>: Orthogonale Züge</li>
        <li><span className="font-medium">Q / E / Z / C</span>: Diagonale Züge</li>
        <li><span className="font-medium">Zugreihenfolge</span>: Abwechselnd – Gegner zieht automatisch</li>
        <li><span className="font-medium">Ziel</span>: Erreiche das gegnerische Tor (rosa)</li>
        <li><span className="font-medium">Verliere</span>: Wenn du dich oder den Gegner blockierst</li>
      </ul>
      <div className="mt-5 flex items-start gap-2 text-neutral-300 text-sm">
        <Info className="w-4 h-4 mt-0.5" />
        <p>
          Die Tore liegen außerhalb des Boards. Du gewinnst, wenn du mit einem Zug das gegnerische Torfeld erreichst.
        </p>
      </div>
    </aside>
  );
}
