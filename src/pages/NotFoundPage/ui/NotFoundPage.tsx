import { Card } from "shared/ui/Card";
import { Text } from "shared/ui/Text";
import { useNavigate } from "react-router-dom";
import { VStack } from "shared/ui/Stack";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <VStack align="center" gap="8">
        <Text title="Page not found" size="l" variant="error" align="center" />
        <button onClick={() => navigate(-1)}>
          Return to the previous page
        </button>
      </VStack>
    </Card>
  );
};

export default NotFoundPage;
