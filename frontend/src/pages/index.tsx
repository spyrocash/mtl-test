import { useState } from "react";
import type { ReactElement } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import type { NextPageWithLayout } from "@/pages/_app";
import _ from "lodash";

// antd
import { ExportOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Space,
  Pagination,
  Input,
  Select,
  Typography,
  Button,
} from "antd";

// components
import LayoutMain from "@/components/layouts/main";
import CardVoteItem from "@/components/card/vote-item";

// services
import { ApiMeResponse } from "@/services/auth";

// hooks
import { serverGetMe } from "@/hooks/auth";
import { useVoteItems } from "@/hooks/vote-item";

const Home: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  // states
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [searchValue, setSearchValue] = useState("");
  const [sortVoteCount, setSortVoteCount] = useState("votes_count:desc");

  // hooks
  const { data, isLoading } = useVoteItems({
    page,
    limit,
    q: searchValue,
    sortBy: sortVoteCount,
  });

  return (
    <div className="home-page">
      <Row justify="space-between" gutter={[16, 16]}>
        <Col>
          <Space wrap>
            <Input.Search
              allowClear
              placeholder="Search"
              onSearch={(v) => {
                setSearchValue(v);
              }}
              enterButton
            />
          </Space>
        </Col>

        <Col>
          <Space wrap>
            <Space>
              <Typography.Text>Sort By:</Typography.Text>

              <Select
                value={sortVoteCount}
                options={[
                  {
                    value: "votes_count:asc",
                    label: "Vote Count: Low to Hight",
                  },
                  {
                    value: "votes_count:desc",
                    label: "Vote Count: Hight to Low",
                  },
                ]}
                onChange={(v) => {
                  setSortVoteCount(v);
                }}
              />
            </Space>

            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vote-items/export`}
              target="_blank"
            >
              <Button type="primary" icon={<ExportOutlined />}>
                Export
              </Button>
            </a>
          </Space>
        </Col>
      </Row>

      <br />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Row gutter={[16, 16]}>
          {isLoading ? (
            <>
              {_.map(_.times(3), (index) => {
                return (
                  <Col span={24} md={12} xl={8} key={index}>
                    <CardVoteItem loading={isLoading} />
                  </Col>
                );
              })}
            </>
          ) : (
            <>
              {_.map(data?.data, (item) => {
                return (
                  <Col span={24} md={12} xl={8} key={item.id}>
                    <CardVoteItem
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      voteCount={item.votes.length}
                    />
                  </Col>
                );
              })}
            </>
          )}
        </Row>

        <br />

        <div style={{ textAlign: "center" }}>
          <Pagination
            total={data?.meta.total}
            current={page}
            onChange={(v) => {
              setPage(v);
            }}
          />
        </div>
      </Space>
    </div>
  );
};

Home.getLayout = function getLayout(
  page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
) {
  return (
    <LayoutMain title="Home" user={page.props.user}>
      {page}
    </LayoutMain>
  );
};

export const getServerSideProps: GetServerSideProps<{
  user: ApiMeResponse;
}> = async ({ res, req }) => {
  const user = await serverGetMe({ res, req });

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { user } };
};

export default Home;
