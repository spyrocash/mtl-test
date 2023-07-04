import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/pages/_app";
import Image from "next/image";

// antd
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Space } from "antd";

// components
import LayoutAuth from "@/components/layouts/auth";

// hooks
import { useAuth, serverGetMe } from "@/hooks/auth";

// services
import { ApiLoginRequest } from "@/services/auth";

// assets
import logoImage from "../../../public/assets/images/logo.svg";

const Login: NextPageWithLayout = () => {
  // hooks
  const { logging, login } = useAuth();

  const onFinish = async (values: ApiLoginRequest) => {
    await login(values);
  };

  return (
    <>
      <div className="login-page">
        <div className="login-form-container">
          <div className="login-form-block">
            <Image
              className="logo"
              src={logoImage}
              alt="logo"
              height={44}
              style={{ display: "block", margin: "auto" }}
            />

            <br />

            <Typography.Title
              level={2}
              style={{ textAlign: "center", margin: 0 }}
            >
              Login
            </Typography.Title>

            <br />

            <Form
              layout="vertical"
              name="login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  loading={logging}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          background: rgb(63, 94, 251);
          background: radial-gradient(
            circle,
            rgba(63, 94, 251, 1) 0%,
            rgba(252, 70, 107, 1) 100%
          );
        }

        .login-form-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-form-block {
          max-width: 300px;
          width: 100%;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
            0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
          padding: 20px;
        }
      `}</style>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuth title="Login">{page}</LayoutAuth>;
};

export const getServerSideProps: GetServerSideProps<{}> = async ({
  res,
  req,
}) => {
  const user = await serverGetMe({ res, req });

  if (user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { user } };
};

export default Login;
