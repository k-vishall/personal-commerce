import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import vishalImg from "../assets/vishal.jpg";
import amanImg from "../assets/aman.jpg";
export default function About() {
  return (
    <>
      {/* Wrapper */}
      <div className="min-h-screen">
        {/* <div className="text-center mt-10">
          <h3 className="text-4xl font-bold">About Us</h3>
          <p className="mt-6 mx-auto text-lg max-w-3xl leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta illo
            nisi obcaecati nam delectus non exercitationem, deserunt fugit ad
            error blanditiis repellendus? Maxime tempore, reiciendis eum amet
            quod doloremque voluptatibus.
          </p>
        </div> */}

        <div className="my-5 text-center">
          <h3 className="text-5xl font-bold mb-12">Creators</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
            
            <div className="flex flex-col items-center">
              <div className="w-[500px] aspect-[1/1]">
                <img
                  src={amanImg}
                  alt="Aman Malik"
                  className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div className="text-center mt-6 space-y-4">
                <Label className="text-3xl font-bold">Aman Malik</Label>
                <p className="text-lg max-w-md leading-relaxed">
                  Aman is a self-proclaimed "bug whisperer" if there's a bug in
                  the code, he can hear it cry at 3 AM. Known for his
                  caffeine-fueled coding marathons, he believes sleep is a
                  "nice-to-have" feature. His motto? "If it works, don’t touch
                  it!"
                </p>
                <Button>Know More</Button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[500px] aspect-[1/1]">
                <img
                  src={vishalImg}
                  alt="Vishal Kumar"
                  className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div className="text-center mt-6 space-y-4">
                <Label className="text-3xl font-bold">Vishal Kumar</Label>
                <p className="text-lg max-w-md leading-relaxed">
                  Vishal is the "CSS Magician" he can center a div in under 5
                  minutes (which is basically sorcery). He once optimized a
                  website so well, it loaded before the user even clicked the
                  link. His secret weapon? Ctrl + Z.
                </p>
                <Button>Know More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
