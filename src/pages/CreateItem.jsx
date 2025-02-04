import { ItemTable } from "@/components/ItemTable"; 
import { CreateItemDialog } from "@/components/CreateItemDialog";
import { CreateCategoryDialog } from "@/components/CreateCategoryDialog";
export default function CreateItem() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-semibold">Items Manager</h2>
          <div className="flex gap-x-4">
          <CreateCategoryDialog/>
          <CreateItemDialog/>
          </div>
        </div>

        <ItemTable />
      </main>
    </div>
  );
}
