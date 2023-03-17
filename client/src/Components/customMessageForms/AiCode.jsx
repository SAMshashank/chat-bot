import { usePostAiCodeMutation } from "@/state/aip";
import React, { useState } from "react";
import MessageFormUI from "./MessageFormUI";

function AiCode({ props, activeChat }) {
  const [message, setmessage] = useState("");
  const [attachment, setAttachment] = useState("");
  //api call

  const [triggerCode] = usePostAiCodeMutation();

  //api call

  const HandleChange = (e) => setmessage(e.target.value);
  const HandleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);

    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    // below all the stuff is in rest.chatengine.io
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };
    props.onSubmit(form);
    triggerCode(form);
    setmessage("");
    setAttachment("");
  };
  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      HandleChange={HandleChange}
      HandleSubmit={HandleSubmit}
    />
  );
}

export default AiCode;
