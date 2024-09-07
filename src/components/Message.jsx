import styles from "./Message.module.css";

function Message({ message }) {
  return (
    <>
      {/* <h1><span role="img">👋</span> Hello there</h1> */}
      <p className={styles.message}>
        {message}
      </p>
    </>
  );
}

export default Message;
