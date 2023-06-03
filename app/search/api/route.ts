import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
export async function GET(request: Request) {
    const { data, error } = await supabaseClient.rpc("match_products", {
        embedding: [
            -0.021511247,
            -0.019980289,
            -0.0025834902,
            -0.009244127,
            -0.02152422,
            0.020434387,
            -0.03599047,
            0.003117055,
            0.0089067975,
            -0.015361469,
            -0.0091338465,
            0.01914994,
            -0.016399406,
            0.0133115435,
            -0.014492197,
            0.023003282,
            0.027116107,
            -0.03746953,
            0.011391359,
            -0.01282501,
            -0.01576367,
            0.012630397,
            -0.005844883,
            0.005215634,
            -0.009665789,
            0.012617423,
            0.014206764,
            -0.025131052,
            0.0072525856,
            -0.0032840979,
            0.007868861,
            -0.0033408601,
            -0.008485136,
            -0.036068313,
            -0.0072979955,
            -0.0149203455,
            -0.021913446,
            0.012753652,
            0.0010582093,
            -0.006539004,
            0.02031762,
            -0.011670305,
            0.014816552,
            0.01419379,
            -0.00986689,
            -0.0041582356,
            0.020992277,
            0.0153225465,
            0.00023008957,
            0.037054356,
            0.016788634,
            0.020538181,
            0.0048491126,
            -0.0033473473,
            0.014894398,
            -0.014206764,
            0.013804563,
            0.026454423,
            0.027479384,
            -0.0029694731,
            0.008939234,
            -0.001975324,
            -0.022211853,
            0.008212677,
            -0.012552552,
            -0.021653963,
            -0.048212178,
            -0.003392757,
            -0.006406018,
            0.0031981438,
            0.013090982,
            0.034407616,
            0.014608965,
            0.015063062,
            0.0017417882,
            0.0034933072,
            -0.013019623,
            -0.009711199,
            -0.008284035,
            -0.00025928154,
            0.01656807,
            -0.022860564,
            -0.0073044826,
            -0.012734191,
            0.030722938,
            0.02856922,
            -0.031397596,
            0.040713083,
            -0.004787485,
            -0.01076211,
            0.025208898,
            0.011105927,
            0.031760875,
            -0.017463291,
            -0.034874685,
            0.0078234505,
            0.00331329,
            0.021238789,
            0.0056827054,
            -0.050314,
            0.0045928718,
            0.012792575,
            -0.024002295,
            0.003957135,
            -0.033888645,
            -0.018008208,
            -0.006393044,
            0.0041225567,
            0.031293802,
            -0.0072071757,
            -0.020006238,
            0.012987188,
            0.010132861,
            -0.028439477,
            0.038896695,
            -0.014699784,
            -0.0021975075,
            0.0030538056,
            -0.018825585,
            -0.035549346,
            -0.0005591075,
            0.017657906,
            0.012364426,
            -0.007148792,
            0.012727704,
            0.023626043,
            -0.022211853,
            -0.020097056,
            -0.0066557718,
            0.0051540066,
            0.03941566,
            0.022302674,
            -0.008550007,
            0.011741663,
            -0.009393331,
            0.004777754,
            -0.03513417,
            0.0019623498,
            0.002804052,
            -0.025559202,
            -0.0010711835,
            0.025753815,
            -0.035730984,
            -0.0074277376,
            0.016944323,
            -0.006785514,
            -0.014089996,
            0.0031657082,
            -0.003079754,
            0.009892838,
            0.024287729,
            -0.024651006,
            0.016295612,
            0.0051961727,
            0.009555508,
            0.011378385,
            -0.02179668,
            0.004502052,
            -0.030722938,
            0.005293479,
            0.014427326,
            -0.0015812323,
            0.0049074963,
            -0.014868449,
            0.031423546,
            0.016490227,
            0.035834778,
            0.017385447,
            -0.008180242,
            0.017554112,
            -0.009062489,
            0.01668484,
            -0.031164061,
            -0.0015779887,
            0.018773688,
            0.02457316,
            0.0074342247,
            -0.0015520403,
            0.0013663468,
            0.002148854,
            -0.033421576,
            0.015906386,
            -0.0006041118,
            0.027479384,
            -0.023003282,
            -0.0006312766,
            0.011449744,
            -0.017022168,
            -0.03352537,
            0.004686935,
            0.00662658,
            0.012649858,
            0.022121035,
            0.0066038747,
            -0.6447665,
            -0.013019623,
            -0.017683854,
            -0.032124154,
            0.023781734,
            0.026908519,
            0.004894522,
            -0.014712758,
            0.00071195996,
            0.000044218756,
            -0.022717848,
            0.036717024,
            -0.020291671,
            -0.011041056,
            -0.00019136966,
            -0.01619182,
            0.009101411,
            -0.0040349807,
            0.0023483327,
            0.025533253,
            -0.015166856,
            0.036094263,
            0.015802592,
            -0.0062989807,
            -0.022069138,
            0.0093608955,
            0.006850385,
            -0.01192979,
            -0.0007407465,
            0.035886675,
            -0.015582031,
            0.031475443,
            0.0062860064,
            -0.0025461894,
            0.044449657,
            -0.017761698,
            -0.021096071,
            0.0025607855,
            0.004083634,
            0.031164061,
            -0.0070774336,
            0.0021310146,
            0.020019213,
            -0.010924288,
            -0.0025024016,
            -0.0023483327,
            0.0077520926,
            -0.004508539,
            0.01453112,
            0.00006775986,
            0.031838723,
            -0.003953892,
            0.026726881,
            0.015646901,
            0.0101133995,
            -0.022172932,
            0.027038261,
            0.005585399,
            0.011443256,
            0.0034543844,
            -0.025688943,
            0.0072850212,
            -0.024612084,
            -0.0046090893,
            -0.025299717,
            0.0421143,
            0.0048912787,
            0.007953193,
            -0.0021472324,
            -0.03002233,
            -0.0009900947,
            0.016425354,
            -0.02675283,
            -0.0045669232,
            0.0074147633,
            0.022795694,
            0.0070255366,
            0.008575955,
            -0.0063087116,
            0.012208736,
            -0.0067660525,
            -0.004693422,
            -0.016957298,
            0.0044631297,
            0.0421143,
            -0.0018407166,
            -0.017463291,
            -0.015737722,
            0.032072257,
            -0.005731359,
            0.016542122,
            0.0035549346,
            -0.02789456,
            -0.009808506,
            -0.005666488,
            0.018916404,
            -0.027193952,
            0.03100837,
            0.016334536,
            -0.02724585,
            -0.017593034,
            -0.01179356,
            0.008018064,
            0.007356379,
            0.016347509,
            0.022536209,
            0.01163787,
            0.040375754,
            0.028361632,
            -0.033213988,
            0.0272199,
            -0.00894572,
            -0.009659302,
            0.014051073,
            -0.011949251,
            -0.01995434,
            0.031631134,
            0.008232139,
            0.0014806822,
            0.0020126249,
            0.008024551,
            -0.0042328374,
            0.0071098693,
            -0.0051702242,
            0.0024505046,
            0.007583428,
            -0.016645916,
            -0.015880438,
            -0.010891853,
            0.004952906,
            0.03365511,
            0.0006738482,
            0.040557392,
            -0.0010395589,
            0.0040641725,
            -0.012027096,
            -0.00015609601,
            0.024028243,
            0.050132364,
            -0.035237964,
            -0.0030927283,
            0.011845457,
            -0.018553127,
            -0.03137165,
            -0.016023153,
            -0.038247984,
            -0.022432417,
            -0.009944735,
            -0.026363602,
            0.0073109693,
            -0.011923303,
            -0.012520117,
            -0.0013209372,
            0.025260795,
            -0.013298569,
            -0.0023045447,
            -0.04162128,
            -0.0066946945,
            -0.007842912,
            -0.009328459,
            0.026026273,
            0.0036879203,
            -0.011332976,
            -0.0014101348,
            -0.009795532,
            -0.025377562,
            -0.0034057312,
            0.0008514328,
            -0.01767088,
            -0.043930687,
            0.004515026,
            -0.017164884,
            -0.013026111,
            0.0024310434,
            -0.03100837,
            0.018176874,
            -0.01863097,
            -0.02336656,
            0.007278534,
            -0.009062489,
            -0.019085068,
            0.028543271,
            -0.0036587282,
            -0.0020726307,
            0.003006774,
            0.025974376,
            0.027816715,
            0.029036291,
            0.017216781,
            -0.005588643,
            0.018112002,
            0.0012422809,
            -0.026065195,
            0.029918537,
            -0.0130325975,
            -0.005630809,
            -0.01619182,
            -0.013635899,
            0.0041939146,
            0.00697364,
            0.0154782375,
            0.016269663,
            0.025390536,
            -0.0049593933,
            0.006058958,
            -0.029451465,
            0.025208898,
            0.015802592,
            0.013817538,
            0.024404496,
            -0.0016258311,
            -0.025818685,
            -0.0047096396,
            -0.033317782,
            0.008147806,
            0.00038578015,
            0.025935454,
            -0.008640827,
            -0.008478649,
            0.0072006886,
            0.0057410896,
            -0.0010517222,
            0.002041817,
            -0.005329158,
            -0.013596976,
            -0.0034154619,
            0.008134832,
            0.016983246,
            -0.024806697,
            -0.0076612732,
            -0.008569468,
            0.007278534,
            0.04076498,
            0.03399244,
            0.012559039,
            0.025727866,
            0.016879452,
            -0.035575293,
            0.034225978,
            0.0062438403,
            0.012993675,
            0.051922806,
            -0.007972654,
            0.0048555997,
            0.0230941,
            -0.004787485,
            0.03500443,
            0.02367794,
            -0.0043690666,
            0.0185661,
            0.0054751183,
            0.012046558,
            -0.030619144,
            0.003756035,
            0.04338577,
            0.010976185,
            0.0023953642,
            0.0068179495,
            0.015231727,
            0.024132038,
            0.0052350955,
            -0.024339626,
            0.012195761,
            -0.0021893985,
            0.009840941,
            -0.00011757881,
            0.008848414,
            -0.010963211,
            -0.02986664,
            0.0073693534,
            0.011274592,
            -0.0033278859,
            0.012111428,
            -0.015906386,
            -0.008634339,
            -0.01699622,
            0.01742437,
            -0.0011879514,
            0.018488254,
            0.016645916,
            -0.031760875,
            -0.026986364,
            0.008193216,
            0.03248743,
            -0.000930089,
            -0.024923464,
            -0.012610936,
            0.048990633,
            -0.01656807,
            0.0020661436,
            0.028128095,
            0.013078008,
            -0.014297584,
            0.0054751183,
            -0.009257101,
            -0.020084083,
            0.023885528,
            0.0068309237,
            0.047952693,
            -0.014271636,
            0.015802592,
            -0.0024018514,
            -0.005724872,
            -0.029347671,
            0.025883557,
            -0.0062211356,
            -0.008614878,
            -0.021147968,
            0.018877482,
            -0.0028689231,
            -0.025857609,
            -0.017865492,
            0.0023856335,
            -0.00019947854,
            0.002064522,
            0.022977334,
            -0.0010160431,
            -0.00013653333,
            0.002964608,
            -0.00697364,
            -0.006058958,
            -0.0013420202,
            -0.023145998,
            -0.009451714,
            0.082412206,
            0.021238789,
            -0.0022915704,
            0.013052059,
            -0.0014790604,
            -0.007881835,
            -0.011955738,
            0.010671291,
            0.0031640865,
            0.010625881,
            -0.003791714,
            -0.0052253646,
            0.00883544,
            -0.002542946,
            -0.011391359,
            -0.0064384537,
            0.00012122781,
            -0.007778041,
            0.0047680237,
            -0.010865904,
            0.010872391,
            0.012195761,
            -0.0035289861,
            0.014077022,
            0.005685949,
            0.022302674,
            -0.0065195425,
            0.012604449,
            0.014751681,
            -0.024638033,
            0.0091338465,
            0.024041219,
            0.0025251063,
            -0.010372884,
            -0.009114386,
            0.0023953642,
            0.014323532,
            -0.0049269577,
            0.0114237955,
            0.008394317,
            0.012941779,
            -0.013999177,
            -0.0052837487,
            -0.012552552,
            0.014790604,
            -0.008692724,
            -0.00348682,
            0.0338108,
            -0.006798488,
            -0.023470353,
            -0.00044396138,
            0.0144403,
            -0.0038565851,
            -0.013493182,
            0.02081064,
            0.026726881,
            -0.027453436,
            -0.0030894848,
            -0.00986689,
            -0.018682867,
            0.017009195,
            -0.0141678415,
            0.02607817,
            -0.0014068913,
            0.0029467684,
            0.00010673318,
            -0.007998602,
            0.02869896,
            -0.001517983,
            -0.016918374,
            -0.007648299,
            -0.029191982,
            -0.014583017,
            0.0005497823,
            0.0010882122,
            0.012111428,
            -0.0141678415,
            0.026000325,
            0.017048117,
            0.027090158,
            -0.0024213127,
            -0.009172769,
            -0.0037819834,
            -0.018721791,
            0.008264574,
            0.009172769,
            0.02186155,
            -0.004982098,
            -0.024365574,
            0.04273706,
            0.0210312,
            0.008076448,
            0.062431917,
            -0.00045815192,
            -0.012708242,
            0.02971095,
            0.015958283,
            0.0085564945,
            0.00692823,
            0.03746953,
            0.0015301463,
            -0.007959681,
            -0.028257838,
            -0.015076037,
            0.024183935,
            -0.01715191,
            -0.0047842413,
            0.0074342247,
            -0.021602066,
            -0.00038496926,
            0.027764818,
            -0.0017207051,
            0.0081542935,
            0.0025656507,
            0.0060459836,
            0.0045669232,
            -0.009659302,
            0.023042204,
            0.00034908744,
            -0.02755723,
            0.016775658,
            -0.031293802,
            0.027816715,
            -0.012721216,
            0.00097225513,
            0.013428312,
            -0.006354121,
            -0.03796255,
            -0.020473309,
            -0.009711199,
            0.020330593,
            0.016814582,
            -0.03222795,
            -0.016399406,
            -0.020226799,
            0.023457378,
            -0.031397596,
            0.0062924935,
            -0.016879452,
            -0.014336506,
            -0.046317942,
            0.023042204,
            0.011307027,
            0.009146821,
            -0.001227685,
            -0.02383363,
            0.0062535712,
            -0.00228184,
            -0.012786088,
            0.022652978,
            -0.009289538,
            -0.008128345,
            -0.011585973,
            0.003885777,
            -0.013687796,
            -0.030333713,
            -0.029762847,
            -0.017112989,
            0.008867875,
            -0.013661847,
            0.0058351527,
            -0.0007139872,
            0.024287729,
            0.008485136,
            -0.02542946,
            -0.008913285,
            0.02937362,
            -0.0012633641,
            0.0074861213,
            0.015296598,
            0.0043171695,
            0.014907371,
            0.005105353,
            0.0009211692,
            0.015063062,
            0.035212018,
            -0.018086053,
            -0.011060517,
            -0.0021342582,
            0.031942513,
            -0.011514614,
            -0.0064384537,
            -0.008841927,
            -0.0120530445,
            -0.0019623498,
            0.020032186,
            0.0052480693,
            0.0006470889,
            0.009140334,
            -0.016230742,
            0.012169813,
            -0.009691738,
            0.01453112,
            0.0032824762,
            -0.01085293,
            -0.014427326,
            -0.003973353,
            -0.03531581,
            -0.016152896,
            0.0029662296,
            -0.00022177797,
            -0.0023045447,
            0.009172769,
            0.021511247,
            -0.020927407,
            -0.004469617,
            0.006798488,
            0.00006537788,
            0.00223643,
            -0.00174341,
            -0.021991292,
            0.0102690905,
            -0.006007061,
            -0.05033995,
            -0.00726556,
            0.0070839208,
            -0.02426178,
            0.024054192,
            -0.016049102,
            -0.008965182,
            -0.0027667512,
            -0.00038375292,
            -0.00045653016,
            -0.010690752,
            0.030411556,
            0.010009606,
            0.0069931014,
            -0.020680897,
            -0.0133634405,
            -0.036068313,
            -0.015153882,
            0.014660861,
            0.040297907,
            -0.009120872,
            -0.000036591337,
            -0.010301526,
            0.005199416,
            -0.007408276,
            -0.018721791,
            0.018267693,
            -0.00039429447,
            -0.011015108,
            -0.02262703,
            0.0012138999,
            -0.009561996,
            0.019915419,
            0.0012860689,
            -0.0094127925,
            0.021225814,
            -0.007648299,
            -0.028335683,
            0.003616562,
            -0.009704712,
            0.021070123,
            0.003996058,
            -0.010061502,
            0.0031316509,
            0.023197895,
            0.004683691,
            -0.00017028656,
            0.004047955,
            0.013532105,
            0.0032840979,
            0.008303497,
            0.038066342,
            0.0021666938,
            0.0065617086,
            0.009049514,
            0.015517159,
            0.020940382,
            -0.030152073,
            0.008472161,
            0.0009179256,
            0.028154043,
            0.016334536,
            -0.010372884,
            -0.013324518,
            -0.027790766,
            -0.0016096134,
            0.008271061,
            0.011216208,
            0.008309984,
            0.0116508445,
            -0.0031624646,
            -0.022588106,
            0.008264574,
            0.007226637,
            -0.023781734,
            -0.009017078,
            -0.027142055,
            -0.055685326,
            -0.0008417021,
            -0.0021520976,
            0.023042204,
            0.0034933072,
            -0.020979304,
            -0.0018926135,
            0.013214237,
            -0.025624072,
            0.015127934,
            -0.0012211979,
            0.0012601205,
            -0.019565115,
            0.019629985,
            0.025105104,
            -0.02614304,
            0.022652978,
            -0.02244539,
            -0.014660861,
            -0.018864507,
            -0.00000774145,
            -0.015413366,
            -0.013622925,
            -0.005410247,
            0.0025915992,
            0.005539989,
            -0.009717686,
            0.009334947,
            -0.021329608,
            0.02201724,
            0.0035160119,
            -0.024949413,
            0.008361881,
            -0.009270076,
            0.012357939,
            -0.021640988,
            0.004129044,
            0.014336506,
            -0.0054297084,
            -0.019266708,
            -0.02614304,
            0.007855887,
            -0.010184757,
            -0.009782557,
            -0.028076198,
            -0.003953892,
            -0.016049102,
            0.0020807395,
            -0.02105715,
            -0.024002295,
            -0.0053875423,
            0.025273768,
            0.00049748004,
            0.0037754963,
            -0.011397847,
            -0.00997717,
            -0.03069699,
            0.002607817,
            0.0059811124,
            -0.01973378,
            -0.008044013,
            0.02675283,
            0.0056632445,
            -0.02558515,
            -0.03635375,
            -0.0049723675,
            -0.035834778,
            -0.019772703,
            0.010197732,
            0.016049102,
            0.0010719944,
            0.028828703,
            -0.0154782375,
            0.03251338,
            0.0055302586,
            0.00363278,
            -0.018397436,
            -0.013778615,
            -0.0010249629,
            -0.006224379,
            0.010055016,
            -0.005163737,
            -0.018423384,
            -0.018656919,
            0.015011165,
            0.024780748,
            -0.0013371549,
            0.019046146,
            -0.012805549,
            0.011754638,
            -0.021186892,
            -0.0024213127,
            -0.00013146528,
            -0.009101411,
            0.007998602,
            -0.02771292,
            -0.02334061,
            -0.023781734,
            0.030307764,
            -0.041647226,
            0.021251762,
            -0.009425767,
            0.0009860402,
            0.027271798,
            -0.00086765055,
            -0.01831959,
            -0.026272783,
            0.00005894145,
            0.024858594,
            0.005098866,
            0.0036846767,
            0.026493344,
            0.0004524757,
            -0.0048555997,
            -0.0005599184,
            -0.013389389,
            -0.010541549,
            0.0010160431,
            0.024339626,
            -0.0032111178,
            0.017709803,
            -0.017372472,
            0.011054031,
            -0.0023969861,
            -0.01582854,
            -0.0089067975,
            -0.008738133,
            -0.016853504,
            0.01632156,
            0.005332402,
            -0.005861101,
            0.0029548772,
            0.005964895,
            -0.030178022,
            -0.004644769,
            -0.005848127,
            -0.004845869,
            -0.006347634,
            -0.001590152,
            -0.022925436,
            0.009925273,
            -0.010178271,
            0.011722202,
            0.020395463,
            0.025364589,
            0.024897516,
            0.2014636,
            -0.0063735824,
            0.0019720804,
            0.030255867,
            0.014751681,
            -0.008115371,
            0.004894522,
            -0.002672688,
            -0.009218179,
            -0.014154867,
            -0.021822628,
            0.023651991,
            -0.01296124,
            0.0030473184,
            0.009756609,
            -0.010295039,
            -0.005468631,
            -0.04203645,
            -0.03829988,
            0.00858893,
            -0.02179668,
            -0.017164884,
            -0.006863359,
            -0.0023142754,
            0.022665951,
            -0.00238239,
            0.0102690905,
            0.0012138999,
            0.012974214,
            0.00633466,
            -0.0395973,
            -0.013895383,
            0.012461732,
            -0.012610936,
            0.021848576,
            0.006441697,
            0.01625669,
            0.01015881,
            0.0018731521,
            -0.015361469,
            -0.0076742475,
            -0.021692885,
            -0.008322958,
            0.0027829688,
            -0.0013039085,
            0.010710213,
            -0.0009892838,
            -0.01807308,
            -0.0039798403,
            0.00075777515,
            -0.033473473,
            -0.008180242,
            0.01370077,
            0.023068152,
            0.04060929,
            0.0008708941,
            0.013116931,
            -0.0041809403,
            -0.0017580059,
            -0.011183772,
            0.015595005,
            0.003885777,
            -0.026363602,
            0.0078104767,
            -0.03165708,
            0.01970783,
            -0.011183772,
            -0.022341596,
            0.0026678226,
            0.0137137445,
            -0.0056956797,
            -0.0021099315,
            0.0037949577,
            0.009010592,
            -0.014310558,
            -0.018656919,
            0.026052222,
            0.0032127397,
            0.0125785,
            0.024495317,
            -0.0019218054,
            0.0016704301,
            -0.037210044,
            -0.015633928,
            0.010703727,
            -0.024248805,
            0.007576941,
            0.0003119893,
            -0.0014628426,
            -0.008387829,
            -0.00937387,
            -0.010917801,
            0.0025153756,
            -0.0048750606,
            0.0008976534,
            0.024209883,
            0.026156016,
            0.028828703,
            -0.022523236,
            0.01930563,
            0.0028137825,
            -0.013726718,
            -0.006714156,
            0.026065195,
            0.002941903,
            0.00408039,
            -0.0040998515,
            0.0052999663,
            0.0010922666,
            -0.017787647,
            -0.026830675,
            -0.0145700425,
            0.010353423,
            -0.0036230492,
            0.0021196622,
            -0.008322958,
            0.0045215134,
            -0.015361469,
            0.0048328945,
            -0.00858893,
            -0.0027862124,
            -0.0070774336,
            -0.010288551,
            0.024858594,
            0.0039636223,
            -0.017138936,
            -0.005773525,
            0.020525206,
            -0.016373457,
            -0.035393655,
            0.03202036,
            0.020914434,
            0.016632942,
            -0.013584002,
            -0.02657119,
            -0.0042231064,
            0.018449333,
            -0.017138936,
            0.006792001,
            -0.021005252,
            -0.0048491126,
            -0.026220886,
            -0.005199416,
            0.009218179,
            0.002731072,
            -0.029347671,
            0.0230941,
            -0.00042409461,
            0.0069347173,
            -0.022432417,
            -0.0038144188,
            -0.013506156,
            0.00053275365,
            -0.017048117,
            0.01287042,
            -0.008978156,
            -0.014025125,
            -0.020356541,
            0.017476266,
            0.008991131,
            -0.020979304,
            0.009179256,
            0.021939395,
            -0.00031888185,
            0.011028082,
            0.016100999,
            -0.16357888,
            0.0272199,
            -0.000715609,
            -0.0050664307,
            0.027427489,
            0.015491212,
            0.016710788,
            0.0016071807,
            -0.034044337,
            0.005238339,
            0.013013137,
            0.0015447424,
            -0.004553949,
            -0.021537196,
            -0.028076198,
            0.00046828802,
            -0.006071932,
            0.02706421,
            0.014297584,
            0.024274753,
            0.019292656,
            -0.008634339,
            0.021472324,
            0.0057864995,
            -0.015270649,
            -0.0014936564,
            -0.00046828802,
            0.010106913,
            -0.026233861,
            0.008491623,
            -0.0065260297,
            -0.01988947,
            0.0017985504,
            0.0039117252,
            0.012020609,
            0.0075509925,
            -0.017112989,
            -0.008368368,
            -0.0056697316,
            0.04766726,
            0.0063411472,
            0.03002233,
            0.003966866,
            -0.006217892,
            -0.005205903,
            0.006276276,
            0.018215796,
            -0.01316234,
            0.005296723,
            -0.011047543,
            0.015737722,
            -0.019033171,
            0.0070320237,
            -0.00055099867,
            0.021991292,
            0.020525206,
            -0.0003247608,
            -0.019565115,
            0.013934306,
            0.0004386906,
            -0.020512233,
            -0.018397436,
            0.011235669,
            0.014128919,
            -0.006399531,
            0.0038079317,
            -0.013214237,
            0.021926422,
            -0.043437667,
            0.019604037,
            -0.0017498971,
            -0.021096071,
            0.03137165,
            -0.009750121,
            0.024845619,
            -0.007563967,
            -0.026960416,
            0.004599359,
            0.0028413527,
            -0.0019185619,
            0.007829938,
            0.030956475,
            -0.011469205,
            0.014479223,
            0.013687796,
            -0.00054370065,
            -0.01316234,
            0.012552552,
            -0.006276276,
            0.008044013,
            0.0063735824,
            -0.028309735,
            -0.00408039,
            -0.0083813425,
            0.003305181,
            0.013006649,
            0.023249792,
            0.010781571,
            0.0006361419,
            -0.029321723,
            0.018669894,
            -0.012364426,
            -0.015361469,
            0.022730822,
            0.008472161,
            0.012299554,
            0.015283624,
            -0.009458202,
            0.03749548,
            -0.009237641,
            -0.02013598,
            0.0018763957,
            0.005274018,
            0.022549184,
            0.0077261445,
            -0.0013233698,
            0.02789456,
            -0.029399568,
            0.019383475,
            -0.023405481,
            0.02130366,
            -0.0024618572,
            -0.0037463042,
            0.023470353,
            -0.014634913,
            -0.010463703,
            -0.083657734,
            -0.02112202,
            -0.00058789406,
            0.0404017,
            -0.02312005,
            0.013220724,
            -0.011332976,
            0.032902606,
            0.008446213,
            0.017917389,
            0.00858893,
            -0.020226799,
            -0.0076677604,
            -0.008712185,
            0.012124402,
            0.012591475,
            -0.008206191,
            -0.00052059034,
            0.01625669,
            0.0012374156,
            0.0029451465,
            -0.0006037064,
            -0.019279681,
            -0.0021602067,
            -0.014894398,
            -0.0047453186,
            -0.032201998,
            0.002919198,
            0.012435784,
            0.030593196,
            -0.009101411,
            -0.020291671,
            0.010937262,
            -0.020187877,
            -0.01493332,
            -0.0089067975,
            -0.014998191,
            -0.00096820074,
            0.0069476916,
            -0.014634913,
            -0.004284734,
            -0.034407616,
            0.021913446,
            -0.06969748,
            0.005676219,
            -0.027142055,
            -0.032772865,
            0.0024148256,
            0.009633354,
            -0.013181801,
            -0.032072257,
            -0.005767038,
            -0.016619967,
            -0.000021970007,
            0.036172107,
            -0.0049496624,
            -0.0060427403,
            -0.010716701,
            -0.022159956,
            -0.021692885,
            -0.023301689,
            -0.017281653,
            -0.036820818,
            0.010677778,
            -0.0073239435,
            0.009172769,
            -0.0338627,
            -0.021199865,
            0.041439638,
            -0.0014668971,
            -0.016710788,
            0.02426178,
            -0.025727866,
            0.029944485,
            -0.013194775,
            0.016490227,
            -0.046473633,
            -0.004002545,
            -0.015114959,
            -0.0056989235,
            -0.025312692,
            -0.022419441,
            -0.010262603,
            -0.027297746,
            0.011572999,
            0.020836588,
            -0.0037657656,
            0.012254145,
            -0.00080277945,
            -0.016853504,
            0.0013201262,
            0.018540151,
            0.021186892,
            -0.010989159,
            -0.028595168,
            -0.015465263,
            -0.0049302015,
            -0.016204793,
            0.0421143,
            0.0020466822,
            -0.03173493,
            -0.029892588,
            -0.07836425,
            -0.0000070445926,
            0.009691738,
            0.010930775,
            0.00031523284,
            -0.005192929,
            0.0057994737,
            0.0038565851,
            0.007343405,
            -0.0034543844,
            -0.016594019,
            -0.007583428,
            -0.009626866,
            -0.011307027,
            0.00849811,
            -0.025312692,
            0.029788796,
            0.0032597713,
            0.020862537,
            0.017618982,
            0.0076677604,
            -0.010710213,
            0.046058457,
            -0.011079978,
            -0.0025851121,
            0.013843486,
            0.008264574,
            0.0018488255,
            -0.026233861,
            0.0042166193,
            -0.013895383,
            -0.031241907,
            -0.012786088,
            0.043697152,
            -0.017411396,
            -0.039078332,
            0.013558053,
            0.039156176,
            0.0014101348,
            -0.046447687,
            -0.0395973,
            -0.020953355,
            0.0027635077,
            -0.008984643,
            -0.016243715,
            -0.0009552265,
            -0.009010592,
            0.00011261212,
            0.015984232,
            0.0023872554,
            0.035730984,
            0.019694857,
            -0.01582854,
            -0.024534239,
            -0.00064384536,
            -0.00091630383,
            0.00059073215,
            -0.003992814,
            0.022406468,
            -0.02481967,
            0.03876695,
            -0.0030635362,
            0.012260632,
            0.0014571664,
            0.034589253,
            0.006785514,
            -0.01838446,
            -0.0017044874,
            0.02740154,
            -0.0056697316,
            -0.035082273,
            0.00044436683,
            0.0065909005,
            -0.007395302,
            0.029788796,
            -0.009802018,
            -0.015971256,
            0.0015074415,
            -0.03549745,
            0.063417956,
            0.034096234,
            0.041673176,
            -0.018981274,
            0.024663981,
            0.008128345,
            0.009341434,
            -0.0097630955,
            -0.0029694731,
            -0.018617997,
            0.029477414,
            -0.003674946,
            -0.011676792,
            -0.0014912237,
            0.005030751,
            -0.013869435,
            0.016866477,
            -0.006107611,
            0.0024018514,
            -0.00874462,
            0.040790927,
            -0.0021439889,
            -0.0038306366,
            -0.0057443334,
            -0.021044174,
            -0.005543233,
            0.0030473184,
            0.0026191694,
            -0.035212018,
            0.0028867626,
            0.011994661,
            -0.00037118414,
            -0.018423384,
            0.0038565851,
            0.0071163564,
            -0.044683192,
            0.0037754963,
            -0.0076612732,
            0.010327474,
            -0.008932746,
            0.024832645,
            -0.016645916,
            -0.0030602927,
            0.00373333,
            -0.012909343,
            0.02444342,
            0.004054442,
            0.010132861,
            -0.013661847,
            -0.018189847,
            0.0034122183,
            0.00952956,
            0.010528575,
            -0.027686972,
            -0.0022250777,
            -0.0019331579,
            -0.0016477251,
            0.02444342,
            0.03565314,
            -0.0057929866,
            0.06570142,
            0.000174341,
            -0.014336506,
            0.0013906736,
            -0.02179668,
            0.016918374,
            0.01733355,
            0.00042612184,
            -0.020097056,
            -0.016632942,
            0.0033668084,
            -0.010243142,
            -0.008803004,
            -0.025792737,
            -0.03876695,
            0.0050469693,
            -0.0083813425,
            0.021355556,
            -0.018228771,
            -0.040583342,
            -0.01154705,
            -0.0005250502,
            0.030748887,
            0.018592048,
            -0.01789144,
            -0.011845457,
            -0.00722015,
            0.009393331,
            -0.0031284073,
            -0.02161504,
            0.026700933,
            -0.023457378,
            -0.037703067,
            -0.017528163,
            0.0033505908,
            0.0021180403,
            -0.023392508,
            0.0018617997,
            -0.0034997943,
            0.020058135,
            0.008530546,
            0.0141678415,
            -0.029191982,
            -0.0056924364,
            0.00013136392,
            -0.03002233,
            0.02020085,
            0.0075445054,
            -0.0070190495
        ],
        match_threshold: 0.78,
        match_count: 10,
        min_content_length: 50
    })
    return new Response(JSON.stringify(data, null, 2));
}