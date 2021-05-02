from astropy.io import fits
import pandas as pd
import numpy

rsFile = "rsFieldSlots-test-newfield-apo.fits"

if __name__ == "__main__":
    fitsRec = fits.open(rsFile)[1].data
    cols = fitsRec.columns.names

    d = {}
    for col in cols:
        if col in ["needed_sb", "slots"]:
            continue
        d[col] = fitsRec[col].tolist()

    df = pd.DataFrame(d)

    # fake a design id?
    df.insert(0, "configid",numpy.arange(len(df)))

    df.to_csv("rsFields.csv", index=False)

    # import pdb; pdb.set_trace()