import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const ListMessages = ({ messages }) => {

    return (
        <ListGroup>
            {
                messages.map(message => (
                    <ListGroup.Item key={message.id}>{message.body}</ListGroup.Item>
                ))
            }
        </ListGroup>
    );
}

export default ListMessages;
