import DashboardComponent from "@/components/dashboardComponent";
import FooterComponent from "@/components/footerComponent";
import HeaderComponent from "@/components/headerComponent";

export default function DashboardPage() {
    return (
        <div>
            <HeaderComponent />
            <DashboardComponent />
            <FooterComponent />
        </div>
    );
}