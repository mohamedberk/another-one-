import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Plus, X } from 'lucide-react';

interface ListInputProps {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export function ListInput({ title, items, onChange, placeholder }: ListInputProps) {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleAdd}
          variant="ghost"
          className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 group"
          >
            <span className="flex-1 text-neutral-800">{item}</span>
            <Button
              type="button"
              onClick={() => handleRemove(index)}
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 