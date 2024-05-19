import { Flex, Avatar, Typography, Button, Modal } from "antd";
import { IdcardFilled} from "@ant-design/icons";
import { IUser } from "../../../interfaces";
// import { useGo, useNavigation } from "@refinedev/core";
// import { useLocation } from "react-router-dom";
import { useModal } from "@refinedev/antd";

type Props = {
  customer?: IUser;
};

export const CustomerInfoSummary = ({ customer }: Props) => {
  // const go = useGo()
  const { show, modalProps } = useModal();
  // const {showUrl} = useNavigation()
  // const { pathname } = useLocation();

  // const handleButtonClick = () => {
  //   if (customer?.id !== undefined) {
  //     go({
  //       to: `${showUrl("user", customer.id)}`,
  //       query: {
  //         to: pathname,
  //       },
  //       options: {
  //         keepQuery: true,
  //       },
  //       type: "replace",
  //     });
  //   } else {
  //     console.error("Customer ID is undefined");
      
  //   }
  // };

  return (
    <Flex align="center" gap={32}>
      <Avatar size={96} src={customer?.avatar?.[0]?.url} />
      <Flex vertical>
        <Typography.Text type="secondary">#{customer?.id}</Typography.Text>
        <Typography.Title
          level={3}
          style={{
            margin: 0,
          }}
        >
          {customer?.fullName}
        </Typography.Title>
      </Flex>
      <Button 
          icon={<IdcardFilled/>}
          onClick={show}
       >
          Edit
      </Button>
      <Modal {...modalProps}>
         <p>Modal Content</p>
      </Modal>
        {/* <Button 
          icon={<IdcardFilled/>}
          onClick={handleButtonClick}
        >
          Edit
        </Button> */}
    </Flex>
  );
};
