import React from "react";

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onAction?: (row: any) => void;
  actionLabel?: string;
}

export default function Table({ columns, data, onAction, actionLabel }: TableProps) {
  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        <div className="overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {columns.map((col, index) => (
                    <th 
                      key={index}
                      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 first:pl-6 last:pr-6"
                    >
                      {col.header}
                    </th>
                  ))}
                  {onAction && (
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground last:pr-6">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td 
                      colSpan={columns.length + (onAction ? 1 : 0)} 
                      className="h-24 px-6 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full bg-muted p-3">
                          <svg
                            className="h-6 w-6 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="text-sm font-medium">No data available</div>
                        <div className="text-xs text-muted-foreground">
                          There are no records to display at this time.
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => (
                    <tr 
                      key={idx}
                      className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      {columns.map((col, colIdx) => (
                        <td 
                          key={colIdx}
                          className="p-4 align-middle [&:has([role=checkbox])]:pr-0 first:pl-6 last:pr-6"
                        >
                          <div className="text-sm font-medium">
                            {Array.isArray(row[col.accessor]) 
                              ? row[col.accessor].join(", ") 
                              : row[col.accessor] || "—"
                            }
                          </div>
                        </td>
                      ))}
                      {onAction && (
                        <td className="p-4 align-middle last:pr-6">
                          <button
                            onClick={() => onAction(row)}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 py-1"
                          >
                            {actionLabel || "Action"}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component to show the table in action
function TableDemo() {
  const sampleColumns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Status", accessor: "status" },
    { header: "Tags", accessor: "tags" }
  ];

  const sampleData = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      tags: ["Developer", "Team Lead"]
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
      tags: ["Designer"]
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Manager",
      status: "Active",
      tags: ["Management", "Strategy", "Planning"]
    }
  ];

  const handleAction = (row: any) => {
    alert(`Action clicked for: ${row.name}`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Table Component Demo</h1>
          <p className="text-muted-foreground mt-2">
            A modern, responsive table component that works in both light and dark modes.
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Table with Data</h2>
            <Table 
              columns={sampleColumns} 
              data={sampleData} 
              onAction={handleAction}
              actionLabel="Edit"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Empty Table</h2>
            <Table 
              columns={sampleColumns} 
              data={[]} 
              onAction={handleAction}
              actionLabel="Edit"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Table without Actions</h2>
            <Table 
              columns={sampleColumns} 
              data={sampleData.slice(0, 2)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}