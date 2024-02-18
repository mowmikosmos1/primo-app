import { InboxList } from "./InboxList";
import { InfoType } from "./types";

export const InfoBox = ({ information }: { information: InfoType[] }) => {
  return (
    <div className="importantInOrderTypefo">
      <b>I N F O R M A C J E</b>
      <div className="insideBox">
        <InboxList infoList={information}></InboxList>
      </div>
    </div>
  );
};
