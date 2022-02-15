class ProfilePermission {
  public permissions: Array<any> = [
    {
      module: 'dataMaestra',
      profiles: ['ADMIN'],
      path: 'dataMaestra',
    },
    {
      module: 'transacciones',
      profiles: ['ADMIN', 'USER'],
      path: 'transacciones',
    },
    {
      module: 'home',
      profiles: ['ADMIN', 'USER'],
      path: 'dashboard',
    },
    {
      module: 'usuarios',
      profiles: ['ADMIN'],
      path: 'usuarios',
    },
    {
      module: 'configuracion',
      profiles: ['ADMIN'],
      path: 'configuracion',
    },
  ];

  public getPermission = (module: string, profile: string) => {
    return (
      this.permissions.filter(
        (el: any) => module.includes(el.module) && el.profiles.includes(profile)
      ).length > 0
    );
  };
}
export default ProfilePermission;
