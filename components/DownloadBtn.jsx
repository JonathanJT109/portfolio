import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"

const DownloadBtn = ({ btnStyles }) => {
  const handleDownload = () => {
    window.open("/personal_resume.pdf", "_blank");
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="lg"
      className={btnStyles}
    >
      <span>Download CV</span>
      <FiDownload className="text-xl" />
    </Button>
  )
}

export default DownloadBtn
