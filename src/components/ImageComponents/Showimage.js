import FadeIn from "react-fade-in";

export default function Showimage(props) {
  const { image } = props;
  return (
    <FadeIn>
      <div>
        <h5>Your Uploaded Image: </h5>
        <div>
          <div>
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              id="imagePreview"
              className="img-preview"
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
