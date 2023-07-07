import { useState, useEffect } from "react";

// antd
import {
  Card,
  Typography,
  Avatar,
  Space,
  Button,
  Popconfirm,
  message,
  Skeleton,
} from "antd";

// services
import { handleAxiosErrorMessage } from "@/services";
import { apiVote } from "@/services/vote-item";

type CardVoteItemProps = {
  id?: number;
  name?: string;
  description?: string;
  voteCount?: number;
  loading?: boolean;
};

export default function CardVoteItem(props: CardVoteItemProps) {
  // props
  const {
    id,
    name,
    description,
    voteCount: defaultVoteCount = 0,
    loading = false,
  } = props;

  // states
  const [voteCount, setVoteCount] = useState<number>(defaultVoteCount);

  useEffect(() => {
    if (defaultVoteCount !== voteCount) {
      setVoteCount(defaultVoteCount);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultVoteCount]);

  return (
    <>
      <div className="card-vote-item-comp" style={{ height: "100%" }}>
        <Card
          loading={loading}
          title={name}
          extra={
            <Space>
              <Popconfirm
                title="Are you sure to vote this item?"
                onConfirm={() => {
                  if (!id) return;

                  return new Promise((resolve, reject) => {
                    apiVote(id)
                      .then(() => {
                        setVoteCount(voteCount + 1);

                        message.success("Thank You for Voting");

                        resolve(null);
                      })
                      .catch((err) => {
                        message.error(handleAxiosErrorMessage(err));

                        reject(null);
                      });
                  });
                }}
                okText="Yes"
                cancelText="No"
              >
                {loading ? (
                  <Skeleton.Button active />
                ) : (
                  <Button type="primary">VOTE</Button>
                )}
              </Popconfirm>

              {loading ? (
                <Skeleton.Avatar active shape="square" size="large" />
              ) : (
                <Avatar
                  shape="square"
                  size="large"
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                >
                  {voteCount}
                </Avatar>
              )}
            </Space>
          }
          style={{ height: "100%" }}
        >
          <Typography.Paragraph>{description}</Typography.Paragraph>
        </Card>
      </div>
    </>
  );
}
