
			var container;
			var camera, scene, renderer, cameraControls;
      var i = 0;
			var sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;

			function init() {
				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 150000 );
				camera.position.set(0,-10000,10000);

        cameraControls = new THREE.TrackballControls(camera, container);
        //cameraControls.target.set(0, 0, 0);

				scene = new THREE.Scene();
				//scene.fog = new THREE.Fog( 0x000000, 1, 50000 );
				//
				scene.add( new THREE.AmbientLight( 0x404040 ) );
				var light1 = new THREE.DirectionalLight( 0xffffff, 8 );
				light1.position.set( 0, 0, 0);
				scene.add( light1 );
				var light2 = new THREE.DirectionalLight( 0xffffff, 1 );
				light2.position.set( 0,-10000,10000 );
				scene.add( light2 );

				//Auringon materiaali
				var materialSun = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('img/sun.jpg')} );

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

				sun = new THREE.Mesh( new THREE.SphereGeometry(300,32,32), materialSun );
				mercury = new THREE.Mesh( new THREE.SphereGeometry(27,32,32), materialMercury );
				venus = new THREE.Mesh( new THREE.SphereGeometry(67,32,32), materialVenus );
				earth = new THREE.Mesh( new THREE.SphereGeometry(70,32,32), materialEarth );
					moon = new THREE.Mesh( new THREE.SphereGeometry(20,32,32), materialMoon );
				mars = new THREE.Mesh( new THREE.SphereGeometry(37,32,32), materialMars );
				jupiter = new THREE.Mesh( new THREE.SphereGeometry(784,32,32), materialJupiter );
				saturn = new THREE.Mesh( new THREE.SphereGeometry(662,32,32), materialSaturn );
				uranus = new THREE.Mesh( new THREE.SphereGeometry(280,32,32), materialUranus );
				neptune = new THREE.Mesh( new THREE.SphereGeometry(272,32,32), materialNeptune );

				//Lisätään aurinko, planeetat ja kuut
				scene.add( sun );
				scene.add( mercury );
				scene.add( venus );
				scene.add( earth );
				scene.add( moon );
				scene.add( mars );
				scene.add( jupiter );
				scene.add( saturn );
				scene.add( uranus );
				scene.add( neptune );

				//Lisätään Saturnuksen renkaat
				var geometryRingSaturn = new THREE.RingGeometry( 690, 740, 32 );
				ringSaturn = new THREE.Mesh( geometryRingSaturn, materialRingSaturn );
				scene.add( ringSaturn );

				//Lisätään tähtiä tai jotain
				var geometry = new THREE.SphereGeometry(5, 10, 2);
				var material = new THREE.MeshDepthMaterial();

				group = new THREE.Group();
				for ( var i = 0; i < 20000; i ++ ) {
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 60000 - 10000;
					mesh.position.y = Math.random() * 60000 - 10000;
					mesh.position.z = Math.random() * 60000 - 10000;
					mesh.matrixAutoUpdate = false;
					mesh.updateMatrix();
					group.add( mesh );
				}
				scene.add( group );

				//
				renderer = new THREE.WebGLRenderer( { antialias: true, alpha : true } );
				renderer.setClearColor(0x000000, 0);
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth-40, window.innerHeight-40 );

				container.appendChild( renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth-40, window.innerHeight-40 );
			}
			function orbit(angle) {
				var time = Date.now() * 0.001;
				var earthSpeed = 0.00002;

				sun.rotation.x = 45;
				sun.rotation.y = time * 0.05;

				mercury.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*4)*774;
				mercury.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*4)*774;
				mercury.rotation.x = 45;
				mercury.rotation.y = time * -1;

				venus.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*1.7)*1446;
				venus.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*1.7)*1446;
				venus.rotation.x = 45;
				venus.rotation.y = time * -1;

				earth.position.x = Math.sin(Math.PI * Date.now()*earthSpeed)*2000;
				earth.position.y = Math.cos(Math.PI * Date.now()*earthSpeed)*2000;
				earth.rotation.x = 45;
				earth.rotation.y = time * -1;
							moon.position.x = earth.position.x + Math.sin(Math.PI * Date.now()*earthSpeed*20)*150;
							moon.position.y = earth.position.y + Math.cos(Math.PI * Date.now()*earthSpeed*20)*150;
							moon.rotation.x = 45;
							moon.rotation.y = time * 0.5;

				mars.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.53)*3046;
				mars.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.53)*3046;
				mars.rotation.x = 45;
				mars.rotation.y = time * -1;

				jupiter.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.08)*10406;
				jupiter.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.08)*10406;
				jupiter.rotation.x = 45;
				jupiter.rotation.y = time * -1;

				saturn.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.03)*19078;
				saturn.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.03)*19078;
				saturn.position.z = Math.sin(Math.PI * Date.now()*earthSpeed*0.03)*1000;
				saturn.rotation.x = 30;
				saturn.rotation.y = time * -0.5;
				saturn.rotation.z = 0;
							ringSaturn.position.x = saturn.position.x;
							ringSaturn.position.y = saturn.position.y;
							ringSaturn.position.z = saturn.position.z;
							ringSaturn.rotation = saturn.rotation;

				uranus.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.01)*38370;
				uranus.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.01)*38370;
				uranus.rotation.x = 45;
				uranus.rotation.y = time * -1;

				neptune.position.x = Math.sin(Math.PI * Date.now()*earthSpeed*0.006)*60122;
				neptune.position.y = Math.cos(Math.PI * Date.now()*earthSpeed*0.006)*60122;
				neptune.rotation.x = 45;
				neptune.rotation.y = time * -1;

			}
			//
			function animate() {
				requestAnimationFrame( animate );
        cameraControls.update();
				render();
			}
			function render() {
				orbit();
				renderer.render( scene, camera );

				$('#debug2').text("Auringon kierros: " + sun.rotation.y.toFixed(2));
				$('#debug3').text("Auringon sijainti: X = " + sun.position.x + ", Y = " + sun.position.y + ", Z = " + sun.position.z);
				$('#debug4').text("Kameran sijainti: X = " + camera.position.x.toFixed(0) + ", Y = " + camera.position.y.toFixed(0) + ", Z = " + camera.position.z.toFixed(0));
				$('#debug5').text("Kameran suunta: " + camera.rotation.x + ", " + camera.rotation.y + ", " + camera.rotation.z);
				$('#debug6').text("");
				$('#debug7').text("Maapallon sijainti: X = " + Math.round(earth.position.x) + ", Y = " + Math.round(earth.position.y) + ", Z = " + Math.round(earth.position.z));
				$('#debug8').text("Maapallon kulma: " + Math.sin(Math.PI * Date.now()*0.001).toFixed(2) + " / " + Math.cos(Math.PI * Date.now()*0.001).toFixed(2));
			}
