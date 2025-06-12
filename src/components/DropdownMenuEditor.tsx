
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Save, X, ChevronDown } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'internal' | 'external' | 'dropdown';
  children?: NavigationItem[];
}

interface DropdownMenuEditorProps {
  item: NavigationItem;
  onUpdate: (item: NavigationItem) => void;
}

const DropdownMenuEditor = ({ item, onUpdate }: DropdownMenuEditorProps) => {
  const [editingChild, setEditingChild] = useState<string | null>(null);

  const addDropdownItem = () => {
    const newChild: NavigationItem = {
      id: `dropdown-${Date.now()}`,
      label: 'New Item',
      href: '#',
      type: 'internal'
    };
    
    const updatedItem = {
      ...item,
      children: [...(item.children || []), newChild]
    };
    onUpdate(updatedItem);
    setEditingChild(newChild.id);
  };

  const updateDropdownItem = (childId: string, updates: Partial<NavigationItem>) => {
    const updatedChildren = (item.children || []).map(child =>
      child.id === childId ? { ...child, ...updates } : child
    );
    onUpdate({ ...item, children: updatedChildren });
  };

  const deleteDropdownItem = (childId: string) => {
    const updatedChildren = (item.children || []).filter(child => child.id !== childId);
    onUpdate({ ...item, children: updatedChildren });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Dropdown Menu Items</h4>
        <Button size="sm" onClick={addDropdownItem}>
          <Plus className="w-4 h-4 mr-1" />
          Add Item
        </Button>
      </div>

      <div className="space-y-2">
        {(item.children || []).map((child) => (
          <Card key={child.id} className={editingChild === child.id ? 'ring-2 ring-blue-500' : ''}>
            <CardContent className="p-3">
              {editingChild === child.id ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`child-label-${child.id}`}>Label</Label>
                    <Input
                      id={`child-label-${child.id}`}
                      value={child.label}
                      onChange={(e) => updateDropdownItem(child.id, { label: e.target.value })}
                      placeholder="Menu item label"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`child-href-${child.id}`}>Link (href)</Label>
                    <Input
                      id={`child-href-${child.id}`}
                      value={child.href}
                      onChange={(e) => updateDropdownItem(child.id, { href: e.target.value })}
                      placeholder="e.g., /about or https://example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`child-type-${child.id}`}>Type</Label>
                    <Select 
                      value={child.type} 
                      onValueChange={(value: 'internal' | 'external' | 'dropdown') => 
                        updateDropdownItem(child.id, { type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Internal Page</SelectItem>
                        <SelectItem value="external">External Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => setEditingChild(null)}>
                      <Save className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingChild(null)}>
                      <X className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <div>
                      <span className="font-medium">{child.label}</span>
                      <div className="text-sm text-gray-500">
                        {child.href}
                        <span className="ml-2 px-1 py-0.5 bg-gray-100 rounded text-xs">
                          {child.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingChild(child.id)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteDropdownItem(child.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {!item.children?.length && (
        <div className="text-center py-4 text-gray-500">
          <p className="text-sm">No dropdown items. Click "Add Item" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default DropdownMenuEditor;
