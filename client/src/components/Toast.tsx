type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "12px 16px",
        borderRadius: 6,
        backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
        color: "white",
        fontWeight: 500,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
}
