import { Card } from "shared/ui/Card";
import { Text } from "shared/ui/Text";
import { useNavigate } from "react-router-dom";
import { VStack } from "shared/ui/Stack";
import { Button } from "../../../shared/ui/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <VStack align="center" gap="8">
        <Text title="Page not found" size="l" variant="error" align="center" />
        <Button onClick={() => navigate(-1)} size="l">
          Return to the previous page
        </Button>
      </VStack>
    </Card>
  );
};

export default NotFoundPage;
