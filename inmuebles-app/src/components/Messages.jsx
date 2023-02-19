import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListMessages from "./ListMessages";
import messagesServices from  '../services/messages';
import PropertiesContext from "../context/PropertiesProvider";


const Messages = ({ keyEvent="recibidos", recipientId }) => {
  const [key, setKey] = useState(keyEvent);
  const [sendedMessags, setSendedMessages] = useState(false);
  const [recividedMessages, setRecividedMessages] = useState(false);

  const { user } = useContext(PropertiesContext);

  useEffect(() => {
    messagesServices.getAllMessages()
        .then(messages => {
            setSendedMessages(messages.filter(message => message.sender === user.id));
            setRecividedMessages(messages.filter(message => message.recipient === user.id));
        })
    }, []);



  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="recibidos" title="Recibidos">
          { recividedMessages.length > 0 && <ListMessages messages={recividedMessages}/>}
        </Tab>
        <Tab eventKey="enviados" title="Enviados">
          { sendedMessags.length > 0 && <ListMessages messages={sendedMessags}/> }
        </Tab>
        <Tab eventKey="redactar" title="Redactar">
          <h1>{key}</h1>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Messages;
