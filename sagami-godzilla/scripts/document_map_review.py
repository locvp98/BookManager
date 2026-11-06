"""Record design review against current encoded triplets; do not infer design from hashes."""
from pathlib import Path
import json,itertools
R=Path(__file__).resolve().parents[1]
# These descriptions were checked against the current encoded-review contact sheets.
rows='''1|Kanto to Sagami coast|top-down moving camera|full-bleed locator|satellite and geographic landmarks|regional orientation then bay approach
2|Odawara coast to deep bay|oblique actual relief|single close terrain model|GEBCO mesh and Odawara transect|approach shore then reveal descending transect
3|Sagami to Pacific plate domain|top-down regional|full regional geographic chart|satellite and PB2002 regional boundaries|draw broad plate boundaries
4|Asia to Japan and Kanto|spherical globe and local inset|globe plus locator inset|NASA global texture and Kanto satellite|rotate globe then introduce local inset
5|northern Sagami coastal cities|top-down coastal strip|wide strip with hanging city leaders|satellite and city locations|connect four coastal cities in speech order
6|Miura Izu Oshima|top-down independent crops|three geographic panels|three distinct satellite extents|progressive peninsula and island comparison
7|Tanzawa to river mouths|top-down land catchment|full catchment chart|satellite rivers and river mouths|trace two river systems toward sea
8|Shonan versus Odawara coast|paired top-down crops and profiles|two independent coast and profile columns|two satellite crops and same-scale measured profiles|compare plain coast with steep western margin
9|Sagami Bay versus Sagami-nada|top-down bay and mouth|full geographic division chart|satellite and Manazuru Jogashima divider|connect the two geographic divider points then locate outer sea
10|Tanzawa Hakone and bay|oblique land-oriented relief|single regional mountain model|GEBCO relief satellite and mountain highlights|reveal mountain systems and relation to bay
11|surface versus deep water|conceptual vertical section|wide water column with small locator|warm and cold conceptual layers|opposite layer arrows explain stratification
12|Sagami bay bed|oblique rotating seafloor|water removal over terrain|actual GEBCO terrain and declining conceptual water plane|lower translucent water to reveal seabed
13|local submarine canyon|low close relief flight|close terrain filling frame|actual GEBCO canyon relief|fly along local slopes and valley
14|Sagami Suruga Toyama|three equal-scale top-down maps|three same-scale bay charts|three independent GEBCO geographic datasets|compare bay geometry on common horizontal scale
15|Odawara to offshore deep water|top-down local and vertical profile|local map left profile right|actual Odawara transect from GEBCO|draw geographically anchored line and reveal depth profile
16|west versus east bay shelf|top-down whole-bay strip and paired sections|one shared strip over two aligned profiles|westShelf and eastShelf actual profiles|draw two distinct transects and compare shelves
17|Hiratsuka offshore valleys|top-down vector contours|full dark contour chart|actual marching-squares GEBCO contours|reveal successive real depth contours
18|Sagami survey area|top-down depth field|survey swath chart|GEBCO depth raster and schematic measuring sweep|moving survey wipe explains bathymetric reconstruction
19|bay to Pacific depression|top-down regional strip and measured section|wide regional strip over large profile|PB2002 boundaries and transverse GEBCO trough profile|trace regional boundaries then reveal transverse depth
20|local seabed rise and adjacent valley|top-down contours plus section|light contour map left profile right|actual contours and matching seamount profile|draw cross-section across rise and valley
21|under continental margin|vertical conceptual section|single large subduction diagram|Philippine Sea slab and continental plate|show descending plate direction
22|locked interface|deforming conceptual section|stress sequence and locator|locked contact strain and release|build deformation then show release
23|Kanto underground plate stack|isometric conceptual layers|three overlapping slabs|continental Philippine Sea and Pacific plate layers|introduce different slab directions progressively
24|1923 Kanto epicentral region|top-down regional event chart|geographic event chart plus date card|USGS epicenter Tokyo Yokohama and event date|reveal epicenter and affected regional context
25|1923 versus 1703 regional context|top-down wider offshore crop|geography left two historical records right|1923 catalog point and approximate 1703 offshore region|compare two historical events without claiming recurrence period
27|Izu Oshima island surface|island-oriented oblique aerial|isolated island above sea|GSI aerial photo Terrarium land GEBCO sea|smooth aerial approach and peninsula distance note
28|submerged Oshima volcanic edifice|low side relief view|island plus broad underwater base|higher-resolution land mesh and GEBCO submarine slopes|lateral view exposes underwater volcanic extent
29|Sagami and eastern Izu arc|top-down regional plus two conceptual sections|map left stacked mechanism panels right|Sagami subduction and eastern Izu plate relations|compare plate relationships and partial melting mechanism
30|surface to deep-water environment|conceptual depth column|small geographic panel and large depth gauge|depth approximate light and hydrostatic pressure|continuous depth descent with hundred-meter counter
31|Sagami shark records|top-down coast plus biological silhouettes|coastal strip over three species|goblin frilled and megamouth illustrative morphology|compare three recorded shark groups without fake capture points
32|Hatsushima offshore cold seep|top-down close island view and ecological diagram|island left depth band and clams right|high-resolution Hatsushima photo and literature depth range|locate island then explain deep clam habitat
33|photosynthesis versus chemosynthesis|conceptual ecological comparison|two energy pathways and small locator|sunlight phytoplankton and chemical energy clam system|contrast light-driven and chemical energy pathways
35|real deep sea versus cinema|geographic profile and cinema symbol|measured landscape left camera symbol right|real deepSetting profile and fictional cinema icon|separate measured geography from imagined story
36|fictional film operation|conceptual water-column simulation|single fictional depth sequence|new Godzilla silhouette bubbles and depth arrows|sink then raise fictional creature in film-plan explanation
37|bay mouth toward Sagami-nada|top-down offshore and measured section|bay mouth left actual profile right|vertical deepSetting transect reaching below1500m|connect real offshore depth with fictional setting without invented operation coordinates
38|science versus fiction|conceptual comparison|two distinct evidence categories with separating cross|geographic evidence and fictional Godzilla|explicitly reject a scientific causal inference about a monster
39|Shonan coast to offshore|large measured vertical profile|dominant section with small geographic locator|actual Shonan north-south GEBCO section|reveal depth drop invisible from familiar coast
40|coast seabed and underground synthesis|oblique exploded geographic stack|three vertically separated conceptual levels|satellite surface actual relief and schematic plate layer|unfold separate layers to summarize relationships'''
D={}
for line in rows.splitlines():
 n,extent,geometry,layout,layers,mechanism=line.split('|');D[f'map-{int(n):03}']=dict(extent=extent,geometry=geometry,layout=layout,dataLayers=layers,explanationMechanism=mechanism)
p=R/'production/full/storyboard.json';story=json.loads(p.read_text());maps=[s for s in story['scenes'] if s['type']=='map'];assert set(D)=={s['id'] for s in maps}
records=[]
for s in maps:
 sid=s['id'];marker=json.loads((R/f'out/full/map-clips/{sid}.ok.json').read_text());d=D[sid]
 s['mapDesign'].update(d);s['mapDesign']['projection']='WGS84 to Web Mercator for 2D maps; physical km for relief; sphere for globe; conceptual coordinates for explanatory sections'
 s['mapReview']={'staticReview':'reviewed against encoded triplets','sourceFingerprint':marker['fingerprint'],'clipSHA256':marker['sha256'],'proof':'out/full/encoded-review/'+sid+'.jpg','motionMethod':'all encoded frames decoded at native30fps; adjacent-frame statistics and sampled visual sequences; no interactive realtime playback tool available','realTimePlaybackReview':'pending: no playback tool exposed','status':'static and frame-sequence checks complete; final assembled transitions pending'}
 records.append({'id':sid,**d,**s['mapReview']})
p.write_text(json.dumps(story,ensure_ascii=False,indent=2)+'\n')
pairs=[]
for a,b in itertools.combinations(records,2):
 axes=[k for k in ['extent','geometry','layout','dataLayers','explanationMechanism'] if a[k]!=b[k]]
 pairs.append({'a':a['id'],'b':b['id'],'comparison':'encoded triplets and authored layout/data/mechanism descriptions','differentDesignAxes':axes,'aDesign':a['layout']+'; '+a['explanationMechanism'],'bDesign':b['layout']+'; '+b['explanationMechanism'],'staticDecision':'distinct geographic argument and visual construction; common source data permitted','motionDecision':'see per-scene frame-sequence review; realtime playback not claimed'})
report={'mapCount':38,'pairCount':len(pairs),'staticSources':'All38 current encoded map triplets, arranged in7 contact sheets; older pre-fix sheets not used for this record. Differences were reviewed by geographic argument, extent, geometry, layout, layers and explanation, not approved by hashes or numeric similarity threshold.','motionReviewLimitation':'No realtime interactive playback tool was exposed. Full30fps decode, per-frame continuity checks and sampled decoded frame sequences are available; realtime playback remains pending and is not falsely marked passed.','redesigns':json.loads((R/'production/full/design-revisions.json').read_text()),'nearGroupsReviewed':[['map-003','map-019'],['map-008','map-016'],['map-015','map-037','map-039'],['map-021','map-022','map-023','map-029'],['map-002','map-010','map-012','map-013','map-040'],['map-027','map-028'],['map-035','map-036','map-038']],'scenes':records,'pairs':pairs,'overallStatus':'static comparison and automated motion checks complete; realtime playback and final joined-video QA not declared complete'}
(R/'production/full/map-diversity-review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print('Recorded',len(records),'map designs and',len(pairs),'static comparisons; realtime playback limitation retained explicitly.')
