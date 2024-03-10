import {  columns } from "@/components/payments/columns"
import { DataTable } from "@/components/payments/data-table";
import { InfiniteDataTable } from "@/components/payments/infinite-data-table";
import { getData } from "@/lib/data";



export default async function Home() {
  const data = await getData()
  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-3 text-3xl">Recents payments</h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
