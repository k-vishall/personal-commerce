import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { CategoryTable } from "@/components/CategoryTable";
import { CreateCategoryDialog } from "@/components/CreateCategoryDialog";
export default function CreateItem() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-semibold">Category Manager</h2>
          <div className="flex gap-x-4">
          <Button onClick={() => {setDialogOpen(true);}}>
              <CirclePlus /> Create Category
            </Button>
            <CreateCategoryDialog open={dialogOpen} setOpen={setDialogOpen} />
          </div>
        </div>

        <CategoryTable />
      </main>
    </div>
  );
}
