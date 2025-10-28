import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";

// Customer Pages
import CustomerHome from "./pages/Customer/Home";
import MenuPage from "./pages/Customer/Menu";
import CartPage from "./pages/Customer/Cart";
import OrderConfirmationPage from "./pages/Customer/OrderConfirmation";
import ReservationsPage from "./pages/Customer/Reservations";
import AboutPage from "./pages/Customer/About";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import CategoriesPage from "./pages/Admin/Categories";
import MenuItemsPage from "./pages/Admin/MenuItems";
import OrdersPage from "./pages/Admin/Orders";
import DeliveryPage from "./pages/Admin/Delivery";
import CouponsPage from "./pages/Admin/Coupons";
import ReservationsAdminPage from "./pages/Admin/Reservations";
import SettingsPage from "./pages/Admin/Settings";
import DashboardLayout from "./components/DashboardLayout";

function AdminRouter() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/categories" component={CategoriesPage} />
        <Route path="/admin/menu" component={MenuItemsPage} />
        <Route path="/admin/orders" component={OrdersPage} />
        <Route path="/admin/delivery" component={DeliveryPage} />
        <Route path="/admin/coupons" component={CouponsPage} />
        <Route path="/admin/reservations" component={ReservationsAdminPage} />
        <Route path="/admin/settings" component={SettingsPage} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={CustomerHome} />
      <Route path={"/menu"} component={MenuPage} />
      <Route path={"/cart"} component={CartPage} />
      <Route path={"/reservations"} component={ReservationsPage} />
      <Route path={"/about"} component={AboutPage} />
      <Route path={"/order-confirmation/:orderNumber"} component={OrderConfirmationPage} />
      <Route path={"/admin/*"} component={AdminRouter} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

