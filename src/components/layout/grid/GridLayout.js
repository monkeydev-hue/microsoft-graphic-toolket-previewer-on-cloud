// GridLayout: grid view with files previewer
// author: dancing
// created_at: 5/25/2023

import { makeStyles, shorthands, Button, Image } from "@fluentui/react-components";
import { CardFile } from "./CardFile";
import {
    useStaticVirtualizerMeasure,
  } from "@fluentui/react-components/unstable";
import "../../../App.css"
import { DirectoryPreview } from "./Directory";
  // custom styles
const useStyles = makeStyles({

  container: {
      ...shorthands.gap("10px"),
      flexDirection: "row",
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      height: "100%",
      paddingBottom:"10px"
    },
    child: {
      lineHeight: "20px",
      height: "fit-content",
    },
});
  
export const GridLayout = (props) => {
  const styles = useStyles();
  
  const {fileData, handleItemClick} = props;
  const { scrollRef } =
  useStaticVirtualizerMeasure({
    defaultItemSize: 200,
  });
  const directories = fileData.filter(file=> !file?.["@microsoft.graph.downloadUrl"]);
  const files = fileData.filter(file => file?.["@microsoft.graph.downloadUrl"]);

  return (
    <>  

      <div
        aria-label="Grid Previewer"
        className={styles.container}
        role={"list"}
        ref={scrollRef}>
          { directories.length > 0 && directories.map((dir, index) => (
            <span
                role={"listitem"}
                aria-posinset={index}
                aria-setsize={10}
                key={`virtualizer-child-${index}`}
                className={styles.child}
              >
                <DirectoryPreview _onClick={handleItemClick} dir={dir}/>
            </span>
          ))}
          {files.length > 0 && files.map((file, index) =>
            <span
            role={"listitem"}
            aria-posinset={index}
            aria-setsize={10}
            key={`virtualizer-child-${index}`}
            className={styles.child}
            >
              <CardFile file={file}/>
            </span>)}
    </div>
  </>);
};