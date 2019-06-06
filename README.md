# RLEMOV (2)
For those with a CASIO FX-9750GII or similar, I've created a way to play GIFs on your calculator.  

Reddit Post: https://www.reddit.com/r/calculators/comments/aigoka/for_those_with_a_casio_fx9750gii_or_similar_ive/  
YouTube Video: https://www.youtube.com/watch?v=bDfoE-3DheQ  
Online Converter: https://rlemov.glitch.me/  

Calculator Downloadable is downloadable to your calculator.  See:
https://edu.casio.com/education/support_software/dl/PC_links/fa124_inst_204_2.zip  
Calculator Source Code is for looking at the code in Calculator Downloadable without using the above program. Not used.  
Online Converter is the source code for the glitch website used to convert images to RLEMOV. Documentation is there.  

PROGRAMS (For each one, specify how many frames it should expect.)  
RLEMOV Standard parser of RLEMOV listfile.  
RLEMOV-M Deletes listfile to save memory while parsing.  
RLEMOV-2 New parser for the creatively-named RLEMOV2 files. They are about half as large, but they take longer to draw.  
PLAY Plays frames. You can specify how much delay you want as well, via for loop.  
STEP Steps over frames.  

Notes:  
Only tested on the CASIO FX-9750GII.  
You may need to turn Axes Off in the Graph SET UP Menu.  
https://glitch.com/~rlemov contains the source code for the online converter.  
Any old resources will have the original RLEMOV, not RLEMOV2.  
If the listfile is still too big, then I suggest doing it in 2 or so batches;  
Each time, make sure to offset the storage of the picture in the code.  
i.e. StoPict L -> StoPict L+10
