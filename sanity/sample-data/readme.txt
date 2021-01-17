The file [all-sample-data.gz] contains all the pizza, slicemasters, and toppings

You can import that into your sanity studio dataset instead of manaully typing them all out

cmd: [sanity dataset import ./sample-data/all-sample-data.gz production --replace]

- dataset is the directory inside the sanity studio where all the documents live

- production is the name of the dataset

if ever confused, refer to this site [manage.sanity.io]

- Once this is done, reboot and hard restart frontend