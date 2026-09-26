import { Route, Switch } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import Home from "./pages/Home";
import WeddingPage from "./pages/WeddingPage";
import MomentPage from "./pages/MomentPage";
import PersonPage from "./pages/PersonPage";
import DocumentPage from "./pages/DocumentPage";
import WeddingFormPage from "./pages/WeddingFormPage";
import ProvidersPage from "./pages/ProvidersPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/new-wedding" component={WeddingFormPage} />
      <Route path="/providers" component={ProvidersPage} />
      <Route path="/wedding/:id/edit" component={WeddingFormPage} />
      <Route path="/wedding/:id/moment/:momentId" component={MomentPage} />
      <Route path="/wedding/:id" component={WeddingPage} />
      <Route path="/people/:id" component={PersonPage} />
      <Route path="/documents/:id" component={DocumentPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider><WorkspaceProvider><Router /></WorkspaceProvider></TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
