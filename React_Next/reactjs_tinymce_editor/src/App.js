import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  MdOutlineCloudUpload,
  MdAdd,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  styled,
} from "@mui/material";
// import { CategoriesContext } from "../../Registry/contexts";
// import { addNewPost, getBlogMainImageUrl } from "../../Registry/functions";
// import { useParams } from "react-router-dom";
import { firestore } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";

export default function BlogEditorScreen() {
  const [value, setValue] = useState("");
  const [mData, setMData] = useState({});
  const [slug, setSlug] = useState("");
  const [PostTitle, setPostTitle] = useState("");
  const [Categories] = useState("");
  // const { Categories } = useContext(CategoriesContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [CategoryValue, setCategoryValue] = useState({
    title: "a",
    key: "a",
  });
  const [IsSuccess, setIsSuccess] = useState(false);
  const [IsProcessing, setIsProcessing] = useState(false);

  // const { param } = useParams();
  const param = "write-a-new-blog";

  useEffect(() => {
    (async function () {
      const docRef = doc(firestore, "me24Blogs", param);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMData(docSnap.data());
      }
    })();
    // console.log({ CategoryValue });
  }, [param]);

  // useEffect(() => {
  //   (async function () {
  //     const selectedCategory = await Categories.filter(
  //       (item) => item.key === mData?.category
  //     )[0];
  //     setCategoryValue(selectedCategory);
  //     setPostTitle(mData?.title);
  //     setSlug(mData?.slug);

  //     setValue(mData?.data);
  //     const image = await getBlogMainImageUrl(mData?.image);
  //     if (image.status) setSelectedImage(image.downloadURL);
  //   })();
  // }, [Categories, mData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    } else {
      setSelectedImage(null);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      {IsSuccess ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginTop: 10,
          }}
        >
          <MdOutlineCheckCircleOutline
            style={{
              height: 100,
              width: 100,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Typography textAlign={"center"}>
            Blog Modified Successfully.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setValue("");
              setSlug("");
              setPostTitle("");
              setSelectedImage(null);
              setCategoryValue({
                title: "",
                key: "",
              });
              setIsSuccess(false);
            }}
            sx={{
              width: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Exit
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 5,
            borderRadius: 1,
            boxShadow: "0px 0px 4px 1px silver",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 25,
              flexDirection: "column",
              marginBottom: 20,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <label htmlFor="post-title">Post Title : </label>
              <TextField
                size="small"
                className="post-title"
                name="post-title"
                variant="outlined"
                value={PostTitle}
                onChange={(e) => {
                  if (/^[A-Za-z0-9.,/-? ]*$/.test(e.target.value)) {
                    const text = e.target.value;
                    setSlug(
                      text
                        .replaceAll(" ", "-")
                        .replaceAll(".", "-")
                        .replaceAll(",", "-")
                        .replaceAll("/", "-")
                        .replaceAll("?", "-")
                        .toLowerCase()
                    );
                    setPostTitle(text);
                  }
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <label htmlFor="post-slug">Post Slug : </label>
              <TextField
                size="small"
                className="post-slug"
                name="post-slug"
                variant="outlined"
                value={slug}
                onChange={(e) => {
                  if (/^[A-Za-z0-9-]*$/.test(e.target.value)) {
                    setSlug(e.target.value.replaceAll(" ", "-"));
                  }
                }}
              />
            </Box>

            {CategoryValue ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <label>Categories : </label>
                <Autocomplete
                  size="small"
                  value={CategoryValue}
                  onChange={(event, newValue) => setCategoryValue(newValue)}
                  options={Categories}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Selected Categories" />
                  )}
                />
              </Box>
            ) : null}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <label>Post Image :</label>
              {selectedImage && (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src={("", selectedImage)}
                    alt="Selected"
                    width={400}
                    height={250}
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                  <button
                    style={{
                      position: "absolute",
                      marginTop: 10,
                      marginLeft: -40,
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      padding: "5px 10px",
                    }}
                    onClick={() => {
                      setSelectedImage(null);
                    }}
                  >
                    X
                  </button>
                </div>
              )}

              <Button
                component="label"
                variant="contained"
                sx={{ width: 150 }}
                size="small"
                startIcon={<MdOutlineCloudUpload />}
              >
                Upload Image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </div>

          <Editor
            apiKey="q6hwxc9zhfqdynff3mkecszv9ag4q97yeleta8fyxzhcs4y8"
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              plugins:
                "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
            initialValue="Welcome to SHIPSAR.IN Code Editor! Powered by TinyMCE"
          />
          {IsProcessing ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              sx={{ width: 150, mt: 3 }}
              size="small"
              startIcon={<MdAdd />}
              onClick={async () => {
                setIsProcessing(true);
                const content = {
                  image: selectedImage,
                  category: CategoryValue?.key,
                  data: value,
                  slug,
                  title: PostTitle,
                };
                // const response = await addNewPost(content);
                setIsProcessing(false);
                console.log({ content });

                // if (response?.status) {
                //   setIsSuccess(response?.status);
                // }
              }}
            >
              Save
            </Button>
          )}
          <button onClick={log}>Log editor content</button>
        </Box>
      )}
    </>
  );
}
