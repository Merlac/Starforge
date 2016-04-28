
			var container;
			var camera, scene, renderer, cameraControls;
      var i = 0;
			var sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;

			var particleGeometry, particleCount;
			var materials = [];
			var parameterCount, particles;

			function init() {
				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 500000 );
				camera.position.set(0,-10000,10000);

        cameraControls = new THREE.TrackballControls(camera);
        cameraControls.target.set(0, 0, 0);

				scene = new THREE.Scene();
				//scene.fog = new THREE.Fog( 0x000000, 1, 50000 );

				scene.add( new THREE.AmbientLight( 0x404040 ) );

				var sunLight = new THREE.PointLight( 0xffffff, 2, 1000000 );
				sunLight.position.set( 0, 0, 0);
				scene.add( sunLight );

				var light2 = new THREE.DirectionalLight( 0xffffff, 0.1 );
				light2.position.set( 0,-10000,10000 );
				scene.add( light2 );

				//Auringon materiaali
				var materialSun = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/sun.jpg'), opacity: .5, transparent: true, shading: THREE.SmoothShading} );
				materialSun.depthWrite = false;

				//Merkuriuksen materiaali
				var materialMercury = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/mercury.jpg')} );

				//Venuksen materiaali
				var materialVenus = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/venus.jpg')} );

				//Maapallon materiaali
				var materialEarth = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/earth.jpg')} );
							//Kuun materiaali
							var materialMoon = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/moon.jpg')} );

				//Marsin materiaali
				var materialMars = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/mars.jpg')} );

				//Jupiterin materiaali
				var materialJupiter = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/jupiter.jpg')} );

				//Saturnuksen materiaali
				var materialSaturn = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/saturn.jpg'),	shininess: 10
				} );
							var materialRingSaturn = new THREE.MeshPhongMaterial( {
								map: THREE.ImageUtils.loadTexture('img/saturn_rings.png'),
								opacity: 0.4,
								transparent: true
							} );

				//Uranuksen materiaali
				var materialUranus = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/uranus.jpg')} );

				//Neptunuksen materiaali
				var materialNeptune = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/neptune.jpg')} );

				var sizemultiplier = 3;
				sun = new THREE.Mesh( new THREE.SphereGeometry(300,32,32), materialSun );
				mercury = new THREE.Mesh( new THREE.SphereGeometry(27*sizemultiplier,32,32), materialMercury );
				venus = new THREE.Mesh( new THREE.SphereGeometry(67*sizemultiplier,32,32), materialVenus );
				earth = new THREE.Mesh( new THREE.SphereGeometry(70*sizemultiplier,32,32), materialEarth );
					moon = new THREE.Mesh( new THREE.SphereGeometry(20*sizemultiplier,32,32), materialMoon );
				mars = new THREE.Mesh( new THREE.SphereGeometry(37*sizemultiplier,32,32), materialMars );
				jupiter = new THREE.Mesh( new THREE.SphereGeometry(784*sizemultiplier,32,32), materialJupiter );
				saturn = new THREE.Mesh( new THREE.SphereGeometry(662*sizemultiplier,32,32), materialSaturn );
				uranus = new THREE.Mesh( new THREE.SphereGeometry(280*sizemultiplier,32,32), materialUranus );
				neptune = new THREE.Mesh( new THREE.SphereGeometry(272*sizemultiplier,32,32), materialNeptune );

				//Lisätään aurinko, planeetat ja kuut
				//scene.add( sun );
				scene.add( mercury );
				scene.add( venus );
				scene.add( earth );
				scene.add( moon );
				scene.add( mars );
				scene.add( jupiter );
				scene.add( saturn );
				scene.add( uranus );
				scene.add( neptune );

				//Lisätään tähdet
				particleGeometry = new THREE.SphereGeometry(500); /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/

				particleCount = 10000; /* Leagues under the sea */

				/*	Hope you took your motion sickness pills;
				We're about to get loopy.	*/

				for (i = 0; i < particleCount; i++) {

						var vertex = new THREE.Vector3();
						vertex.x = Math.random() * 20000 - 10000;
						vertex.y = Math.random() * 20000 - 10000;
						vertex.z = Math.random() * 20000 - 10000;

						particleGeometry.vertices.push(vertex);
				}

				/*	We can't stop here, this is bat country!	*/

				parameters = [
						[
								[1, 1, 0.5], 5
						],
						[
								[0.95, 1, 0.5], 4
						],
						[
								[0.90, 1, 0.5], 3
						],
						[
								[0.85, 1, 0.5], 2
						],
						[
								[0.80, 1, 0.5], 1
						]
				];
				parameterCount = parameters.length;

				/*	I told you to take those motion sickness pills.
				Clean that vommit up, we're going again!	*/

				for (i = 0; i < parameterCount; i++) {

						color = parameters[i][0];
						size = parameters[i][1];

						materials[i] = new THREE.PointCloudMaterial({
								size: size
						});

						particles = new THREE.PointCloud(particleGeometry, materials[i]);

						particles.rotation.x = Math.random() * 6;
						particles.rotation.y = Math.random() * 6;
						particles.rotation.z = Math.random() * 6;

						scene.add(particles);
				}


				//Lisätään Saturnuksen renkaat
				var geometryRingSaturn = new THREE.RingGeometry( 2500, 3500, 32 );
				ringSaturn = new THREE.Mesh( geometryRingSaturn, materialRingSaturn );
				scene.add( ringSaturn );

				//Lisätään auringon efektivalo
				addLight(scene,0.55, 0.9, 0.5,0,0,0);

				//Lisätään apuruudukko
				var grid = new THREE.GridHelper(100000, 2000);
				grid.rotation.x = -1.57;
				grid.setColors(0xffffff, 0x555555);
				grid.position.z = -1000;
				scene.add(grid);

				renderer = new THREE.WebGLRenderer( { antialias: true, alpha : true } );
				renderer.setClearColor(0x000000, 0);
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth-40, window.innerHeight-40 );

				container.appendChild( renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}

			function addLight(scene, h, s, l, x, y, z ) {
			        THREE.ImageUtils.crossOrigin = '';
			        var textureFlare0 = THREE.ImageUtils.loadTexture('img/lensflare0.png');

			    var light = new THREE.PointLight( 0xffffff, 1.5, 10 );
			    light.color.setHSL( h, s, l );
			    light.position.set( x, y, z );
			    scene.add( light );
			    light = light;

			    var flareColor = new THREE.Color( 0xffffff );
			    flareColor.setHSL( h, s, l + 0.5 );

			    var lensFlare = new THREE.LensFlare( textureFlare0, 800, 0.0, THREE.AdditiveBlending, flareColor );

			    lensFlare.position.copy( light.position );
			    var lensFlare = lensFlare;

			    scene.add( lensFlare );
			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth-40, window.innerHeight-40 );
			}

			function orbit(angle) {
				var time = Date.now() * 0.001;
				var earthSpeed = 0.000005;
				var distanceMultiplier = 3;

				sun.rotation.x = 45;
				sun.rotation.y = time * 0.05;

				mercury.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*4)*774*distanceMultiplier;
				mercury.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*4)*774*distanceMultiplier;
				mercury.rotation.x = 360;
				mercury.rotation.y = time * -1;

				venus.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*1.7)*1446*distanceMultiplier;
				venus.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*1.7)*1446*distanceMultiplier;
				venus.rotation.x = 360;
				venus.rotation.y = time * -1;

				earth.position.x = Math.sin(Math.PI * Date.now()*earthSpeed)*2000*distanceMultiplier;
				earth.position.y = Math.cos(Math.PI * Date.now()*earthSpeed)*2000*distanceMultiplier;
				earth.rotation.x = 360;
				earth.rotation.y = time * -1;
							moon.position.x = earth.position.x + Math.sin(Math.PI * Date.now()*earthSpeed*20)*700;
							moon.position.y = earth.position.y + Math.cos(Math.PI * Date.now()*earthSpeed*20)*700;
							moon.rotation.x = 360;
							moon.rotation.y = time * 0.5;

				mars.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.53)*3046*distanceMultiplier;
				mars.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.53)*3046*distanceMultiplier;
				mars.rotation.x = 360;
				mars.rotation.y = time * -1;

				jupiter.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.08)*10406*distanceMultiplier;
				jupiter.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.08)*10406*distanceMultiplier;
				jupiter.rotation.x = 350;
				jupiter.rotation.y = time * -1;

				saturn.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.03)*19078*distanceMultiplier;
				saturn.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.03)*19078*distanceMultiplier;
				saturn.position.z = Math.sin(Math.PI * Date.now()*earthSpeed*0.03)*1000;
				saturn.rotation.x = 400;
				saturn.rotation.y = time * -0.5;
				saturn.rotation.z = 0;
							ringSaturn.position.x = saturn.position.x;
							ringSaturn.position.y = saturn.position.y;
							ringSaturn.position.z = saturn.position.z;

				uranus.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.01)*38370*distanceMultiplier;
				uranus.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.01)*38370*distanceMultiplier;
				uranus.rotation.x = 45;
				uranus.rotation.y = time * -1;

				neptune.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.006)*60122*distanceMultiplier;
				neptune.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.006)*60122*distanceMultiplier;
				neptune.rotation.x = 45;
				neptune.rotation.y = time * -1;

			}
			//
			function animate() {
				requestAnimationFrame( animate );
				//cameraControls.target.set(earth.position.x, earth.position.y, earth.position.z);
        cameraControls.update();
				render();
			}
			function render() {
				orbit();

				var time = Date.now() * 0.00005;
				for (i = 0; i < materials.length; i++) {

            color = parameters[i][0];

            h = (360 * (color[0] + time) % 360) / 360;
            materials[i].color.setHSL(h, color[1], color[2]);
        }


				renderer.render( scene, camera );

				$('#debug2').text("Kuun kierros: " + moon.rotation.y.toFixed(2));
				$('#debug3').text("Kuun sijainti: X = " + moon.position.x + ", Y = " + moon.position.y + ", Z = " + moon.position.z);
				$('#debug4').text("Kameran sijainti: X = " + camera.position.x.toFixed(0) + ", Y = " + camera.position.y.toFixed(0) + ", Z = " + camera.position.z.toFixed(0));
				$('#debug5').text("Kameran suunta: " + camera.rotation.x + ", " + camera.rotation.y + ", " + camera.rotation.z);
				$('#debug6').text("");
				$('#debug7').text("Maapallon sijainti: X = " + Math.round(earth.position.x) + ", Y = " + Math.round(earth.position.y) + ", Z = " + Math.round(earth.position.z));
				$('#debug8').text("Maapallon kulma: " + Math.sin(Math.PI * Date.now()*0.001).toFixed(2) + " / " + Math.cos(Math.PI * Date.now()*0.001).toFixed(2));
			}
