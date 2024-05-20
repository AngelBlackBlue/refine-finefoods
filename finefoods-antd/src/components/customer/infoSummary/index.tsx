import { Flex, Avatar, Typography, Button, Modal, Input } from "antd";
import { PhoneOutlined, EditOutlined} from "@ant-design/icons";
import { IUser } from "../../../interfaces";

import { useModal} from "@refinedev/antd";
import { HttpError, useForm, useShow } from "@refinedev/core";

type Props = {
  customer?: IUser;
};

export const CustomerInfoSummary = ({ customer }: Props) => {

  const { show, modalProps } = useModal();

  const { onFinish, mutationResult, queryResult } = useForm<IUser, HttpError>({
    action: "edit",
    resource: "users",
    id: customer?.id 
  })

  const record = queryResult?.data?.data;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement; 
    const data = Object.fromEntries(new FormData(formElement).entries());
    onFinish({...data });
  };

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
          icon={<EditOutlined/>}
          onClick={show}
       >
          Edit
      </Button> 
      <Modal 
      {...modalProps} 
      footer={null}
      >
         <p>Actualización de datos del usuario: {`#${customer?.id} `}</p>
         <form onSubmit={onSubmit} >
         <Flex vertical  justify="center" gap={12}>
           <Flex vertical>
              <label htmlFor="fullName">Name</label>
              <Input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  defaultValue={record?.fullName}
              />
           </Flex>
          
          <Flex vertical>
           <label htmlFor="gsm">
             {
                <span>
                  <PhoneOutlined/> {' Gsm No '} 
                </span>
             }
            </label>
           <Input 
               type="text" 
               id="gsm" 
               name="gsm" 
               defaultValue={record?.gsm}
            />
            </Flex>
         
            <Flex justify="center">
            {mutationResult.isSuccess}            
            <Button type="primary" htmlType="submit" >Submit</Button>
            </Flex> 
        
          </Flex>
         </form>
    
      </Modal>

    </Flex>
  );
};
