import { useState } from "react";
// import type { ReactElement } from "react";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
// import Link from "next/link";
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
  Empty,
} from "antd";

// components
import LayoutMain from "@/components/layouts/main";
import CardVoteItem from "@/components/card/vote-item";

// services
// import { ApiMeResponse } from "@/services/auth";

// hooks
import {
  // serverGetMe,
  useMe,
} from "@/hooks/auth";
import { useVoteItems } from "@/hooks/vote-item";

const Home: NextPageWithLayout = () => {
  // states
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 12,
    searchValue: "",
    sortVoteCount: "votes_count:desc",
  });

  // vars
  const { page, limit, searchValue, sortVoteCount } = searchParams;

  // hooks
  const { user, isReady: isUserReady } = useMe();
  const { data: voteItem, isLoading: isVoteItemLoading } = useVoteItems({
    page,
    limit,
    q: searchValue,
    sortBy: sortVoteCount,
  });

  if (!isUserReady) return <Typography.Text>Loading...</Typography.Text>;

  return (
    <LayoutMain title="Home" user={user}>
      <div className="home-page">
        <Row justify="space-between" gutter={[16, 16]}>
          <Col>
            <Space wrap>
              <Input.Search
                allowClear
                placeholder="Search"
                onSearch={(v) => {
                  setSearchParams({
                    ...searchParams,
                    page: 1,
                    searchValue: v,
                  });
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
                    setSearchParams({
                      ...searchParams,
                      sortVoteCount: v,
                    });
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

        <Row gutter={[16, 16]}>
          {isVoteItemLoading ? (
            <>
              {_.map(_.times(3), (index) => {
                return (
                  <Col span={24} md={12} xl={8} key={index}>
                    <CardVoteItem loading={isVoteItemLoading} />
                  </Col>
                );
              })}
            </>
          ) : (
            <>
              {_.map(voteItem?.data, (item) => {
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

        {!isVoteItemLoading && _.isEmpty(voteItem?.data) && (
          <div style={{ textAlign: "center" }}>
            <Empty />
          </div>
        )}

        <br />

        {!_.isEmpty(voteItem?.data) && (
          <div style={{ textAlign: "center" }}>
            <Pagination
              total={voteItem?.meta.total}
              current={page}
              onChange={(v) => {
                setSearchParams({
                  ...searchParams,
                  page: v,
                });
              }}
            />
          </div>
        )}
      </div>
    </LayoutMain>
  );
};

// Home.getLayout = function getLayout(
//   page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
// ) {
//   return (
//     <LayoutMain title="Home" user={page.props.user}>
//       {page}
//     </LayoutMain>
//   );
// };

// export const getServerSideProps: GetServerSideProps<{
//   user: ApiMeResponse;
// }> = async ({ res, req }) => {
//   const user = await serverGetMe({ res, req });

//   if (!user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return { props: { user } };
// };

export default Home;
