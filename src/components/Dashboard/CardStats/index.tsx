import React from "react";
import { Box, SimpleGrid, Card, CardBody, Text, Heading, Icon, Grid } from "@chakra-ui/react";
import { Rating } from "primereact/rating";
import { transform } from "framer-motion";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  bgColor: string;
}

interface StatCardFeedback {
  avatar: string;
  fullName: string;
  rating: number;
  content: string;
  feedbackDate: string;
  imageURL: string;
}
const formatDateTimeFromISOString = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, bgColor }) => {
  return (
    <Card>
      <CardBody>
        <Grid templateColumns="auto 1fr" alignItems="center" gap={6}>
          <Box
            bg={bgColor}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={4}
            p={6}
          >
            <Icon as={icon} boxSize={10} color="#fff" />
          </Box>
          <Box>
            <Text paddingBottom={2} fontWeight={500}>
              {label}
            </Text>
            <Heading size="md">{value}</Heading>
          </Box>
        </Grid>
      </CardBody>
    </Card>
  );
};

export const StatCardFeedback: React.FC<StatCardFeedback> = ({
  avatar,
  fullName,
  rating,
  content,
  feedbackDate,
  imageURL,
}) => {
  return (
    <Card>
      <CardBody>
        <Grid templateColumns="auto 1fr" alignItems="center" gap={6}>
          <Box display="flex" justifyContent="center" alignItems="center" borderRadius={4} p={6}>
            <img
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
              src={
                avatar != null
                  ? avatar
                  : "https://firebasestorage.googleapis.com/v0/b/sportidy-447fd.appspot.com/o/system_feedback%2Fimage%2Fuser.png?alt=media&token=193fef81-6b24-4bb9-bf23-f9aef2c8069e"
              }
            />
          </Box>
          <Box>
            <Text paddingBottom={2} fontWeight={500}>
              {formatDateTimeFromISOString(feedbackDate)}
            </Text>
            <Heading size="md">{fullName != null ? fullName : "Anonymous"}</Heading>
          </Box>
        </Grid>
        {imageURL != null ? (
          <Heading
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px" }}
          >
            <img
              width="200px"
              height="200px"
              style={{ objectFit: "contain" }}
              src={imageURL}
              alt="image"
            />
          </Heading>
        ) : (
          ""
        )}
        <Heading
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px" }}
        >
          <Rating
            style={{ color: "#89e61e", transform: "scale(1.5)", margin: "10px" }}
            value={rating}
            disabled
            cancel={false}
          />
        </Heading>
        <Heading textAlign="center" size="md">
          <Text fontSize="20px">{content}</Text>
        </Heading>
      </CardBody>
    </Card>
  );
};

interface CardStatsProps {
  stats: {
    icon: React.ElementType;
    label: string;
    value: number | string;
    bgColor: string;
  }[];
}

const CardStats: React.FC<CardStatsProps> = ({ stats }) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          bgColor={stat.bgColor}
        />
      ))}
    </SimpleGrid>
  );
};

export default CardStats;
