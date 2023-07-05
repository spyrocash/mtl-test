import Head from "next/head";
import Image from "next/image";

// antd
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Space, Dropdown, Avatar, Typography } from "antd";

// hooks
import { useAuth } from "@/hooks/auth";

// services
import { ApiMeResponse } from "@/services/auth";

// assets
import logoImage from "../../../../public/assets/images/logo.svg";

type LayoutMainProps = {
  title: string;
  children: React.ReactNode;
  user?: ApiMeResponse | null | undefined;
};

export default function LayoutMain(props: LayoutMainProps) {
  // props
  const { title, children, user } = props;

  // hooks
  const { logout } = useAuth();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 48,
          }}
        >
          <Space>
            <div className="logo-block">
              <Image
                src={logoImage}
                alt="logo"
                height={44}
                style={{ display: "block" }}
              />
            </div>
          </Space>

          <Space>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    danger: true,
                    label: "Logout",
                    icon: <LogoutOutlined />,
                    onClick: () => {
                      logout();
                    },
                  },
                ],
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <Typography.Text style={{ color: "#ffffff" }}>
                    {user?.email}
                  </Typography.Text>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        </Layout.Header>

        <Layout.Content className="site-layout" style={{ padding: "0 50px" }}>
          <div
            style={{
              margin: "16px 0",
            }}
          >
            {children}
          </div>
        </Layout.Content>
      </Layout>

      <style global jsx>{`
        @media (max-width: 767px) {
          .ant-layout-header {
            padding: 0 16px !important;
          }

          .site-layout {
            padding: 0 16px !important;
          }
        }
      `}</style>
    </>
  );
}
