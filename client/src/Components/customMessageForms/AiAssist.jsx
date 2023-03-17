import { usePostAiAssistMutation } from "@/state/aip";
import React, { useEffect, useState } from "react";
import MessageFormUI from "./MessageFormUI";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function AiAssist({ props, activeChat }) {
  const [message, setmessage] = useState("");
  const [attachment, setAttachment] = useState("");
  //api call

  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState("");

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
    setmessage("");
    setAttachment("");
  };

  const debouncedValue = useDebounce(message, 1000);
  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debouncedValue]); // eslint-disable-line
  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debouncedValue]); // eslint-disable-line

  const handleKeyDown = (e) => {
    // handle enter and tab
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      setmessage(`${message} ${appendText}`);
    }
    setAppendText("");
  };

  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); // eslint-disable-line
  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      HandleChange={HandleChange}
      HandleSubmit={HandleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
}

export default AiAssist;
