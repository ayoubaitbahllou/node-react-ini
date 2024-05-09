import { Breadcrumb, Layout } from 'antd';


export default function DashBreadcrumb() {
    return (
        <Breadcrumb
            style={{
            margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    )
}