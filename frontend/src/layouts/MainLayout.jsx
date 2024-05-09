import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashBreadcrumb from "../components/DashBreadcrumb";
import { Layout, theme } from 'antd';
const { Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
  }));

export default function MainLayout() {
    
  
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  
    return (
        <Layout className="h-full" style={{overflow: 'auto', height: '100vh'}}>
            <Navbar />
            {/* <div className="container mx-auto">
            </div> */}
            
            <Content
                style={{
                    overflow: 'initial',
                    padding: '0 48px',
                }}
            >
                <DashBreadcrumb />
                <div
                    style={{
                        background: colorBgContainer,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            <Footer />

        </Layout>
    )
    
}