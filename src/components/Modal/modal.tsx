import { Button, Modal } from "antd";

const CustomModal = (props:any) => {
    const handleOk = () => {
      props.onOk();
    };
  
    const handleCancel = () => {
      props.onCancel();
    };
  
    return (
      <Modal
        title={props.title}
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {props.children}
      </Modal>
    );
  };

  export default CustomModal;