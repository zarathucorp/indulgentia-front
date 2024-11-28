import { Column } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

interface ColumnFilterSwitchProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

const ColumnFilterSwitch = <TData, TValue>({
  column,
  title,
}: ColumnFilterSwitchProps<TData, TValue>) => {
  return (
    <div className="flex items-center space-x-2 border border-dashed p-1 rounded-md h-9">
      <span className="text-sm pl-1">{title}</span>
      <Switch
        checked={
          column?.getFilterValue() === true && column?.getIsFiltered() === true
        }
        onCheckedChange={(value) => {
          column?.setFilterValue(value);
        }}
      />
      {column?.getIsFiltered() && (
        <Badge
          onClick={() => {
            column?.setFilterValue(null);
          }}
          variant="secondary"
          className="rounded-sm px-1 font-sm"
        >
          <Cross2Icon className="h-3 w-3" />
        </Badge>
      )}
    </div>
  );
};

export default ColumnFilterSwitch;