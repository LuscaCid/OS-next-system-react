import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { SidebarContextProvider } from "./contexts/Sidebar-context"
import AllRoutes from "./routes/index.routes"

const queryClient = new QueryClient()
function App() {
 
  return (
    <div className="h-screen overflow-auto p-1 text-zinc-950 bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-200">
      <SidebarContextProvider>
        <QueryClientProvider client={queryClient}>
          <AllRoutes />
        </QueryClientProvider>
      </SidebarContextProvider>
      
    </div>
    
  )
}

export default App
