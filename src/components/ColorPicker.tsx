
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  const presetColors = [
    "#2563eb", "#dc2626", "#16a34a", "#ca8a04", 
    "#9333ea", "#c2410c", "#0891b2", "#be123c"
  ];

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="flex items-center space-x-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
        />
        <span className="text-sm font-mono text-slate-600">{value}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-6 h-6 rounded border-2 ${
              value === color ? "border-slate-400" : "border-slate-200"
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
